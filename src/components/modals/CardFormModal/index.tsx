import { CardDetailType } from "@/types/card.type";
import BaseModal from "@/components/common/BaseModal";
import { useCardForm } from "@/hooks/useCardForm";
import Header from "./Header";
import Content from "./Content";

interface CardFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "edit";
  columnId: number;
  initialData?: CardDetailType | null;
  onSuccess: (newCard: CardDetailType) => void;
}

export default function CardFormModal({
  isOpen,
  onClose,
  mode,
  columnId,
  initialData,
  onSuccess,
}: CardFormModalProps) {
  const {
    control,
    errors,
    handleSubmit,
    onSubmit,
    datepickerRef,
    handleDateChange,
    tagList,
    handleKeyDown,
    fileInputRef,
    previewUrl,
    handleImageButtonClick,
    handleFileChange,
  } = useCardForm(onClose, onSuccess, columnId, initialData);

  const formProps = { control, errors };
  const datepickerProps = { datepickerRef, handleDateChange };
  const tagsProps = { tagList, handleKeyDown };
  const imageProps = {
    fileInputRef,
    previewUrl,
    handleImageButtonClick,
    handleFileChange,
  };

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
          formProps={formProps}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          onClose={onClose}
          datepickerProps={datepickerProps}
          tagsProps={tagsProps}
          imageProps={imageProps}
        />
      </div>
    </BaseModal>
  );
}
