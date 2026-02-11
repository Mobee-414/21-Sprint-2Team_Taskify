import { useCardDetail } from "@/hooks/useCardDetail";
import { CardDetailType } from "@/types/card.type";
import BaseModal from "@/components/common/BaseModal";
import Header from "./Header";
import SideInfo from "./SideInfo";
import Content from "./Content";

interface CardDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  cardId: number;
  columnTitle: string;
  handleCardFormOpen: (data: CardDetailType) => void;
  handleCardDeleteModalOpen: (id: number, title: string) => void;
}

export default function CardDetailModal({
  isOpen,
  onClose,
  cardId,
  columnTitle,
  handleCardFormOpen,
  handleCardDeleteModalOpen,
}: CardDetailModalProps) {
  const { control, isValid, handleSubmit, onSubmit, cardDetailData, tagList } =
    useCardDetail(cardId);

  if (!cardDetailData) return;

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} width={730} radius="md">
      <div className="overflow-y-auto">
        <Header
          title={cardDetailData.title}
          onClose={onClose}
          handleCardFormOpen={() => handleCardFormOpen(cardDetailData)}
          handleCardDeleteModalOpen={() =>
            handleCardDeleteModalOpen(cardDetailData.id, cardDetailData.title)
          }
        />

        <div className="flex justify-between">
          <Content
            columnTitle={columnTitle}
            control={control}
            isValid={isValid}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            tagList={tagList}
            title={cardDetailData.title}
            description={cardDetailData.description}
            imageUrl={cardDetailData.imageUrl}
          />

          <SideInfo
            assignee={cardDetailData.assignee}
            dueDate={cardDetailData.dueDate}
          />
        </div>
      </div>
    </BaseModal>
  );
}
