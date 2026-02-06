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
}

export default function CardDetailModal({
  isOpen,
  onClose,
  cardId,
  columnTitle,
  handleCardFormOpen,
}: CardDetailModalProps) {
  const { control, isValid, handleSubmit, onSubmit } = useCardDetail(cardId);

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
          title={"카드 제목"}
          onClose={onClose}
          handleCardFormOpen={handleCardFormOpen}
        />

        <div className="flex justify-between">
          <Content
            columnTitle={columnTitle}
            control={control}
            isValid={isValid}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
          />

          <SideInfo />
        </div>
      </div>
    </BaseModal>
  );
}
