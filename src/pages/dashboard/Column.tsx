import Image from "next/image";
import CardDetailModal from "@/components/modals/CardDetailModal";
import CardFormModal from "@/components/modals/CardFormModal";
import ConfirmModal from "@/components/modals/ConfirmModal";
import { getTagColor } from "@/utils/getTagColor";
import { useColumn } from "@/hooks/useColumn";
import Avatar from "@/components/common/Avatar";

interface ColumnProps {
  id: number;
  title: string;
  onEditClick: () => void;
  onAddCard: () => void;
  refreshTrigger: number;
  onSuccess?: () => void;
}

export default function Column({
  id,
  title,
  onEditClick,
  onAddCard,
  refreshTrigger,
  onSuccess,
}: ColumnProps) {
  const {
    cards,
    isDetailOpen,
    selectedCardId,
    isEditModalOpen,
    editingCardData,
    isDeleteConfirmOpen,
    setIsDetailOpen,
    setSelectedCardId,
    setIsEditModalOpen,
    setIsDeleteConfirmOpen,
    handleCardClick,
    handleEditOpen,
    syncCardList,
    deleteMutate,
  } = useColumn({ id, refreshTrigger });

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

          <h3 className="text-base font-medium text-black-dark leading-snug">
            {card.title}
          </h3>

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
                <Avatar
                  nickname={card.assignee.nickname}
                  imageUrl={card.assignee.profileImageUrl}
                  className="w-6 h-6"
                />
              )}
            </div>
          </div>
        </div>
      ))}

      {isDetailOpen && selectedCardId && (
        <CardDetailModal
          isOpen={isDetailOpen}
          onClose={() => {
            setIsDetailOpen(false);
            setSelectedCardId(null);
          }}
          cardId={selectedCardId}
          columnTitle={title}
          handleCardFormOpen={handleEditOpen}
          handleCardDeleteModalOpen={() => setIsDeleteConfirmOpen(true)}
        />
      )}

      {isDeleteConfirmOpen && (
        <ConfirmModal
          isOpen={isDeleteConfirmOpen}
          onClose={() => setIsDeleteConfirmOpen(false)}
          onClick={() => deleteMutate()}
        >
          카드에 작성된 모든 내용이 삭제 됩니다.
        </ConfirmModal>
      )}

      {isEditModalOpen && editingCardData && (
        <CardFormModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          mode="edit"
          columnId={id}
          initialData={editingCardData}
          onSuccess={(action, cardData) => {
            syncCardList(action, cardData);
            onSuccess?.();
            setIsEditModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
