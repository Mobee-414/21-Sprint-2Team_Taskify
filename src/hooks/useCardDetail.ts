import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CardDetailType, TagItem } from "@/types/card.type";
import { getCard } from "@/api/cards.api";
import { getTagColor } from "@/utils/getTagColor";

export const CardDetailSchema = z.object({
  content: z.string().min(1),
});
export type CardDetailValues = z.infer<typeof CardDetailSchema>;

export function useCardDetail(cardId: number) {
  const [cardDetailData, setCardDetailData] = useState<CardDetailType | null>(
    null,
  );

  // 상세보기
  const getCardDetail = useCallback(
    async (cardId: number): Promise<CardDetailType | undefined> => {
      try {
        const res = await getCard(cardId);
        if (!res || !res.data) return;
        const nextCard: CardDetailType = res.data;

        setCardDetailData(nextCard);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const serverMessage = error.response?.data?.message;
          alert(serverMessage || "서버 응답 오류가 발생했습니다.");
        } else {
          alert("예상치 못한 에러가 발생했습니다.");
        }

        console.error("카드 상세 조회 실패:", error);
        throw error;
      }
    },
    [],
  );

  const tagList: TagItem[] = useMemo(() => {
    if (!cardDetailData) return [];

    return cardDetailData.tags.map((tag) => {
      const colors = getTagColor(tag);
      return {
        name: tag,
        bgColor: colors.bgColor,
        fontColor: colors.fontColor,
      };
    });
  }, [cardDetailData]);

  useEffect(() => {
    const fetchData = async () => {
      if (cardId) {
        await getCardDetail(cardId);
      }
    };

    fetchData();
  }, [cardId, getCardDetail]);

  // 댓글
  const {
    control,
    formState: { isValid },
    handleSubmit: handleSubmit,
  } = useForm<CardDetailValues>({
    resolver: zodResolver(CardDetailSchema),
    mode: "onChange",
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = async (data: CardDetailValues) => {
    console.log(data);
  };

  return {
    control,
    isValid,
    handleSubmit,
    onSubmit,
    cardDetailData,
    tagList,
  };
}
