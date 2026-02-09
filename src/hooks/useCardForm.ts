import { ChangeEvent, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CardDetailType, TagItem } from "@/types/card.type";
import { DatePicker } from "react-datepicker";
import { formatToApiDate } from "@/utils/formatDate";
import { getTagColor } from "@/utils/getTagColor";
import { postCardImage, postCards, putCards } from "@/api/cards.api";

export const CardFormSchema = z.object({
  assigneeUserId: z.number(),
  dashboardId: z.number(),
  columnId: z.number(),
  cardId: z.number().optional().nullable(),
  title: z.string().nonempty("제목을을 입력해주세요."),
  description: z.string().nonempty("설명을 입력해주세요."),
  dueDate: z.string().nonempty("날짜를 선택해주세요."),
  tags: z
    .array(z.string())
    .nonempty("태그를 1개 이상 입력해주세요.")
    .refine((items) => new Set(items).size === items.length, {
      message: "중복된 태그가 있습니다.",
    }),
  imageUrl: z
    .union([z.string(), z.any()])
    .refine((val) => {
      if (!val || (Array.isArray(val) && val.length === 0)) return false;
      return true;
    }, "이미지는 필수입니다.")
    .superRefine((val, ctx) => {
      // 파일 객체인 경우에만 상세 검증 (문자열 URL일 때는 통과)
      if (val instanceof File) {
        // 크기 제한
        if (val.size > 5 * 1024 * 1024) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "최대 파일 크기는 5MB입니다.",
          });
        }
        // 형식 제한
        const ACCEPTED_TYPES = [
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/webp",
        ];
        if (!ACCEPTED_TYPES.includes(val.type)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "JPG, JPEG, PNG, WEBP 형식만 지원합니다.",
          });
        }
      }
    }),
});
export type CardFormValues = z.infer<typeof CardFormSchema>;

export function useCardForm(
  onClose: () => void,
  onSuccess: (newCard: CardDetailType) => void,
  columnId: number,
  initialData?: CardDetailType | null,
) {
  // const params = useParams();
  // const dashboardId = params.dashboardId;
  const dashboardId = 17279; // 임시 고정

  const {
    control,
    formState: { errors, isDirty },
    handleSubmit: handleSubmit,
  } = useForm<CardFormValues>({
    resolver: zodResolver(CardFormSchema),
    mode: "onChange",
    defaultValues: {
      // assigneeUserId: initialData?.assignee.id,
      assigneeUserId: 6522,
      dashboardId: dashboardId,
      columnId: columnId,
      cardId: initialData?.id,
      title: initialData?.title || "",
      description: initialData?.description || "",
      dueDate: initialData?.dueDate || "",
      tags: initialData?.tags || [],
      imageUrl: initialData?.imageUrl || "",
    },
  });

  const datepickerRef = useRef<DatePicker>(null);
  const [tagList, setTagList] = useState<TagItem[]>(() => {
    return initialData?.tags ? initialData.tags.map(getTagColor) : [];
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(() => {
    return initialData?.imageUrl || null;
  });

  // 마감일 날짜 선택 및 변경
  const handleDateChange = (
    date: Date | null,
    onChange: (value: string) => void,
  ) => {
    onChange(date ? formatToApiDate(date) : "");

    if (date && datepickerRef.current) {
      datepickerRef.current.setOpen(false);
    }
  };

  // 태그 추가 및 변경
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    currentTags: string[],
    onChange: (value: string[]) => void,
  ) => {
    if (e.nativeEvent.isComposing) return;

    if (e.key === "Enter") {
      e.preventDefault();
      const value = e.currentTarget.value.trim();

      if (value) {
        setTagList((prev) => [...prev, getTagColor(value)]);
        onChange([...(currentTags || []), value]);
        e.currentTarget.value = "";
      }
    }

    if (e.key === "Backspace") {
      if (e.currentTarget.value === "") {
        const newList = [...tagList];
        newList.pop();
        setTagList(newList);
        onChange(newList.map((tag) => tag.name));
      }
    }
  };

  // 이미지 추가 및 변경
  const handleImageButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    onChange: (value: File) => void,
  ) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    onChange(selectedFile);
    const blobUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(blobUrl);
  };

  const uploadImage = async (imageUrl: File) => {
    const res = await postCardImage(imageUrl, columnId);
    const nextImageUrl: string = res.imageUrl;
    return nextImageUrl;
  };

  const onCreate = async (data: CardFormValues) => {
    const result = await postCards(data);
    return result;
  };

  const onUpdate = async (data: CardFormValues) => {
    if (!data.cardId) return;

    const result = await putCards(data.cardId, data);
    return result;
  };

  const onSubmit = async (data: CardFormValues) => {
    try {
      let finalData = data;
      if (typeof data.imageUrl !== "string") {
        const returnImageUrl = await uploadImage(data.imageUrl);
        finalData = {
          ...data,
          imageUrl: returnImageUrl,
        };
      }
      let result;
      if (!data.cardId) {
        const { cardId, ...payload } = finalData;
        result = await onCreate(payload);
      } else if (data.cardId && isDirty) {
        result = await onUpdate(finalData);
      }
      if (result) {
        onSuccess(result);
        console.log(result);
      }
      onClose();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverMessage = error.response?.data?.message;
        alert(serverMessage || "서버 응답 오류가 발생했습니다.");
      } else {
        alert("예상치 못한 에러가 발생했습니다.");
      }
      console.error("할 일 저장 실패:", error);
      return;
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [initialData?.id]);

  return {
    control,
    errors,
    handleSubmit,
    onSubmit,
    datepickerRef,
    handleDateChange,
    tagList,
    handleKeyDown,
    previewUrl,
    fileInputRef,
    handleImageButtonClick,
    handleFileChange,
  };
}
