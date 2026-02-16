import { deleteCard } from "@/api/cards.api";
import { useCallback, useState } from "react";
import { SyncCardListType } from "@/types/card.type";
import { handleApiError } from "@/utils/handleError";

export function useCardDelete(cardId: number, onSuccess: SyncCardListType) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getCardDelete = useCallback(async () => {
    if (!cardId) return;
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);

      const res = await deleteCard(cardId);

      if (res.status === 204 || res.status === 200) {
        alert("삭제되었습니다.");
        onSuccess("delete", undefined, cardId);
        return;
      }
    } catch (error) {
      handleApiError(error, "카드 삭제 실패:");
    } finally {
      setIsSubmitting(false);
    }
  }, [cardId, onSuccess, isSubmitting]);

  return { mutate: getCardDelete, isSubmitting };
}
