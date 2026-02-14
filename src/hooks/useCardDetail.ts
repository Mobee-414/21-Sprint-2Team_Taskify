import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CardDetailType, TagItem } from "@/types/card.type";
import { getCard } from "@/api/cards.api";
import { getTagColor } from "@/utils/getTagColor";
import { CommentItem } from "@/types/comment.type";
import { getComments } from "@/api/comments.api";
import { useIsMountedRef } from "@/hooks/useIsMountedRef";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";

const SIZE = 5;

export const CardCommentSchema = z.object({
  content: z.string().min(1),
});
export type CardCommentValues = z.infer<typeof CardCommentSchema>;

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
        return;
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

  // 댓글
  const {
    control,
    formState: { isValid },
    handleSubmit: handleSubmit,
  } = useForm<CardCommentValues>({
    resolver: zodResolver(CardCommentSchema),
    mode: "onChange",
    defaultValues: {
      content: "",
    },
  });

  const [commentList, setCommentList] = useState<CommentItem[]>([]);
  const [cursorId, setCursorId] = useState<number | null>(null);
  const [hasNext, setHasNext] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const listScrollRef = useRef<HTMLDivElement | null>(null);
  const mountedRef = useIsMountedRef();

  const onSubmit = async (data: CardCommentValues) => {
    console.log(data);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (cardId) {
        await getCardDetail(cardId);
      }
    };

    fetchData();

    (async () => {
      setLoading(true);
      try {
        const res = await getComments(cardId, SIZE, null);

        if (!mountedRef.current) return;

        setCommentList(res.data.comments);
        setCursorId(res.data.cursorId);
        setHasNext(Boolean(res.data.cursorId) && res.data.comments.length > 0);
      } finally {
        if (mountedRef.current) setLoading(false);
      }
    })();
  }, [cardId, getCardDetail, mountedRef]);

  const loadMore = useCallback(async () => {
    if (!hasNext || loadingMore) return;

    setLoadingMore(true);
    try {
      const res = await getComments(cardId, SIZE, cursorId);

      if (!mountedRef.current) return;

      setCommentList((prev) => [...prev, ...res.data.comments]);
      setCursorId(res.data.cursorId);
      setHasNext(Boolean(res.data.cursorId) && res.data.comments.length > 0);
    } finally {
      if (mountedRef.current) setLoadingMore(false);
    }
  }, [hasNext, loadingMore, cursorId, cardId, mountedRef]);

  const sentinelRef = useInfiniteScroll(
    loadMore,
    hasNext && !loadingMore,
    listScrollRef,
  );

  return {
    cardDetailData,
    tagList,
    commentList,
    loading,
    loadingMore,
    sentinelRef,
    control,
    isValid,
    handleSubmit,
    onSubmit,
  };
}
