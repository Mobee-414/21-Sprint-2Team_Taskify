import { ChangeEvent, useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatToApiDate } from "@/utils/formatDate";
import { TagItem } from "@/types/card.type";
import { getTagColor } from "@/utils/getTagColor";

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
  dashboardId: number,
  columnId: number,
  cardId: number | null,
) {
  const {
    control,
    formState: { errors, isValid },
    handleSubmit: handleSubmit,
  } = useForm<CardFormValues>({
    resolver: zodResolver(CardFormSchema),
    mode: "onChange",
    defaultValues: {
      assigneeUserId: 1,
      dashboardId: dashboardId,
      columnId,
      ...(cardId && { cardId }), // cardId가 있을때만 추가
      title: "",
      description: "",
      dueDate: "",
      tags: [],
      imageUrl: "",
    },
  });

  const datepickerRef = useRef<DatePicker>(null);
  const [tagList, setTagList] = useState<TagItem[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

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

  const onSubmit = async (data: CardFormValues) => {
    console.log(data);
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return {
    control,
    errors,
    isValid,
    handleSubmit,
    onSubmit,
    datepickerRef,
    handleDateChange,
    tagList,
    handleKeyDown,
    fileInputRef,
    previewUrl,
    handleImageButtonClick,
    handleFileChange,
  };
}
