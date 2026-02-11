import axiosInstance from "@/api/axios";
import CardDetailModal from "@/components/modals/CardDetailModal";
import CardFormModal from "@/components/modals/CardFormModal";
import { CardDetailType, SyncCardListType } from "@/types/card.type";
import { getTagColor } from "@/utils/getTagColor";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

interface ColumnProps {
  id: number;
  title: string;
  onEditClick: () => void;
  onAddCard: () => void;
  refreshTrigger: number;
}

export default function Column({
  id,
  title,
  onEditClick,
  onAddCard,
  refreshTrigger,
}: ColumnProps) {
  const [cards, setCards] = useState<CardDetailType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCardData, setEditingCardData] = useState<CardDetailType | null>(
    null
  );

  const handleCardClick = async (cardId: number) => {
    setSelectedCardId(cardId);
    setIsDetailOpen(true);
  };

  const handleEditOpen = (data: CardDetailType) => {
    setEditingCardData(data);
    setIsDetailOpen(false);
    setIsEditModalOpen(true);
  };

  const syncCardList: SyncCardListType = useCallback(
    (action, cardData, cardId) => {
      switch (action) {
        case "create":
          if (cardData) setCards((prev) => [cardData, ...prev]);
          break;

        case "edit":
          if (cardData)
            setCards((prev) =>
              prev.map((item) => (item.id === cardData.id ? cardData : item))
            );
          break;

        case "delete":
          if (cardId)
            setCards((prev) => prev.filter((item) => item.id !== cardId));
          break;
      }
    },
    []
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
  }, [fetchCards, refreshTrigger]);

  return (
    <div className="w-full lg:max-w-[354px] flex flex-col gap-4 p-3">
      <div className="flex justify-between items-center px-1">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-violet-main" />
          <span className="font-bold text-lg">{title}</span>
          <span className="bg-gray-light px-2 py-0.5 rounded text-xs text-gray-dark">
            {cards.length}
          </span>
        </div>
        <button onClick={onEditClick} className="hover:opacity-70 transition">
          <Image src="/icons/setting.svg" alt="설정" width={24} height={24} />
        </button>
      </div>

      {/* 할 일 추가 버튼 */}
      <button
        className="w-full py-2 bg-white border border-gray-light rounded-md text-violet-main font-bold flex justify-center items-center hover:cursor-pointer hover:bg-gray-50 transition"
        onClick={onAddCard}
      >
        <Image
          src="/icons/add_box_purple.svg"
          alt="할일 추가"
          width={22}
          height={22}
        />
      </button>

      {/* 카드 리스트 */}
      {cards.map((card) => (
        <div
          key={card.id}
          onClick={() => handleCardClick(card.id)}
          className="bg-white rounded-lg border border-gray-light p-4 flex flex-col gap-3 hover:ring-1 hover:ring-violet-main transition-all cursor-pointer shadow-sm"
        >
          {card.imageUrl && (
            <div className="relative w-full h-32 overflow-hidden rounded">
              <Image
                src={card.imageUrl}
                alt={card.title}
                fill
                className="object-cover"
              />
            </div>
          )}
          {/* 카드 제목 */}
          <h3 className="text-base font-medium text-black-dark leading-snug">
            {card.title}
          </h3>
          {/* 카드 태그 */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap gap-1.5">
              {card.tags.map((tag, index) => {
                const tagStyle = getTagColor(tag);
                return (
                  <span
                    key={index}
                    className="px-2 py-1 rounded text-md md:text-xs"
                    style={{
                      backgroundColor: tagStyle.bgColor,
                      color: tagStyle.fontColor,
                    }}
                  >
                    {tagStyle.name}
                  </span>
                );
              })}
            </div>
            {/* 마감일 */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1.5 text-md md:text-xs text-gray-medium">
                <Image
                  src="/icons/calender.svg"
                  alt="달력"
                  width={18}
                  height={18}
                />
                <span>{card.dueDate.split(" ")[0]}</span>
              </div>

              {card.assignee && (
                <div className="w-24 h-24">
                  {card.assignee.profileImageUrl ? (
                    <Image
                      src={card.assignee.profileImageUrl}
                      alt={card.assignee.nickname}
                      width={24}
                      height={24}
                    />
                  ) : (
                    card.assignee.nickname[0].toUpperCase()
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      {isDetailOpen && selectedCardId && (
        <CardDetailModal
          isOpen={isDetailOpen}
          onClose={() => setIsDetailOpen(false)}
          cardId={selectedCardId}
          columnTitle={title}
          handleCardFormOpen={handleEditOpen}
          handleCardDeleteModalOpen={(id) =>
            syncCardList("delete", undefined, id)
          }
        />
      )}

      {isEditModalOpen && editingCardData && (
        <CardFormModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          mode="edit"
          columnId={id}
          initialData={editingCardData}
          onSuccess={syncCardList}
        />
      )}
    </div>
  );
}
