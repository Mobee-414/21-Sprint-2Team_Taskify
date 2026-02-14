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
  const {
    cardDetailData,
    tagList,
    control,
    isValid,
    handleSubmit,
    onSubmit,
    commentList,
    loading,
    loadingMore,
    sentinelRef,
  } = useCardDetail(cardId);

  const listProps = {
    commentList,
    loading,
    loadingMore,
    sentinelRef,
  };
  const formProps = { control, isValid };

  if (!cardDetailData) return;

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} width={730} radius="sm">
      <div className="px-[16px] py-[16px] md:px-[32px] py-[24px] overflow-y-auto">
        <Header
          title={cardDetailData.title}
          onClose={onClose}
          handleCardFormOpen={() => handleCardFormOpen(cardDetailData)}
          handleCardDeleteModalOpen={() =>
            handleCardDeleteModalOpen(cardDetailData.id, cardDetailData.title)
          }
        />

        <div className="flex flex-col md:flex-row justify-between md:gap-[13px]">
          <Content
            columnTitle={columnTitle}
            tagList={tagList}
            title={cardDetailData.title}
            description={cardDetailData.description}
            imageUrl={cardDetailData.imageUrl}
            listProps={listProps}
            formProps={formProps}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
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
