import axios from "axios";
import { deleteCard } from "@/api/cards.api";
import { useCallback } from "react";
import { SyncCardListType } from "@/types/card.type";

export function useCardDelete(cardId: number, onSuccess: SyncCardListType) {
  const getCardDelete = useCallback(async () => {
    try {
      if (!cardId) return;
      const res = await deleteCard(cardId);

      if (res.status === 204 || res.status === 200) {
        alert("삭제되었습니다.");
        onSuccess("delete", undefined, cardId);
        return res;
      }
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
  }, [cardId, onSuccess]);

  return { mutate: getCardDelete };
}
