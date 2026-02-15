import axios from "axios";
import { deleteCard } from "@/api/cards.api";
import { useCallback } from "react";
import { SyncCardListType } from "@/types/card.type";
import { handleApiError } from "@/utils/handleError";

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
      handleApiError(error, "카드 삭제 실패:");
    }
  }, [cardId, onSuccess]);

  return { mutate: getCardDelete };
}
