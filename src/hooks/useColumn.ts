import { useCallback, useEffect, useState } from "react";
import axiosInstance from "@/api/axios";
import { useCardDelete } from "@/hooks/useCardDelete";
import { CardDetailType, SyncCardListType } from "@/types/card.type";

interface UseColumnProps {
  id: number;
}

export function useColumn({ id }: UseColumnProps) {
  const [cards, setCards] = useState<CardDetailType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCardData, setEditingCardData] = useState<CardDetailType | null>(
    null,
  );

  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const selectedCard = cards.find((card) => card.id === selectedCardId);

  const syncCardList: SyncCardListType = useCallback(
    (action, cardData, cardId) => {
      switch (action) {
        case "create":
          if (cardData) setCards((prev) => [cardData, ...prev]);
          break;

        case "edit":
          if (cardData) {
            if (cardData.columnId !== id) {
              setCards((prev) =>
                prev.filter((item) => item.id !== cardData.id),
              );
            } else {
              setCards((prev) =>
                prev.map((item) => (item.id === cardData.id ? cardData : item)),
              );
            }
          }
          break;

        case "delete":
          if (cardId)
            setCards((prev) => prev.filter((item) => item.id !== cardId));
          break;
      }
    },
    [id],
  );

  const { mutate: deleteMutate, isSubmitting } = useCardDelete(
    selectedCardId || 0,
    (_, __, cardId) => {
      syncCardList("delete", undefined, cardId);
      setIsDeleteConfirmOpen(false);
      setIsDetailOpen(false);
      setSelectedCardId(null);
    },
  );

  const fetchCards = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.get(`/cards?columnId=${id}`);
      setCards(res.data.cards || []);
    } catch (error) {
      console.error("카드 로딩 실패", error);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  const handleCardClick = (cardId: number) => {
    setSelectedCardId(cardId);
    setIsDetailOpen(true);
  };

  const handleEditOpen = (data: CardDetailType) => {
    setEditingCardData(data);
    setIsDetailOpen(false);
    setIsEditModalOpen(true);
  };

  return {
    cards,
    isLoading,
    isDetailOpen,
    selectedCardId,
    isEditModalOpen,
    editingCardData,
    isDeleteConfirmOpen,
    selectedCard,
    setIsDetailOpen,
    setSelectedCardId,
    setIsEditModalOpen,
    setIsDeleteConfirmOpen,
    handleCardClick,
    handleEditOpen,
    syncCardList,
    deleteMutate,
    isSubmitting,
  };
}
