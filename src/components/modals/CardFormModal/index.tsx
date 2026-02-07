import BaseModal from "@/components/common/BaseModal";
import { useCardForm } from "@/hooks/useCardForm";
import Header from "./Header";
import Content from "./Content";

interface CardFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "edit";
  columnId: number;
  cardId?: number | null;
}

export default function CardFormModal({
  isOpen,
  onClose,
  mode,
  columnId,
  cardId,
}: CardFormModalProps) {
  const { control, errors, isValid, handleSubmit, onSubmit } = useCardForm(
    1, // params로 dashboardId 가져올 예정
    columnId ?? null,
    cardId ?? null,
  );

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
        <Header mode={mode} />

        <Content
          mode={mode}
          control={control}
          errors={errors}
          isValid={isValid}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          onClose={onClose}
        />
      </div>
    </BaseModal>
  );
}
