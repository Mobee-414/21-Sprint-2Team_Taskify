import { useCardDetail } from "@/hooks/useCardDetail";
import BaseModal from "@/components/common/BaseModal";
import Header from "./Header";
import SideInfo from "./SideInfo";
import Content from "./Content";

interface CardDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  cardId: number;
  columnTitle: string;
  handleCardFormOpen: () => void;
  handleCardDeleteModalOpen: (title: string) => void;
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
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      width={730}
      radius="md"
      padding="lg"
      gap="md"
    >
      <div className="w-full">
        <Header
          title={cardDetailData.title}
          onClose={onClose}
          handleCardFormOpen={handleCardFormOpen}
          handleCardDeleteModalOpen={handleCardDeleteModalOpen}
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
