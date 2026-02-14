import { CardDetailType, SyncCardListType } from "@/types/card.type";
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
  onSuccess: SyncCardListType;
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
    isValid,
    isDirty,
    handleSubmit,
    onSubmit,
    columnList,
    memberList,
    datepickerRef,
    handleDateChange,
    tagList,
    handleKeyDown,
    fileInputRef,
    previewUrl,
    handleImageButtonClick,
    handleFileChange,
  } = useCardForm(onClose, onSuccess, columnId, initialData);

  const formProps = { control, errors, isValid, isDirty };
  const datepickerProps = { datepickerRef, handleDateChange };
  const tagsProps = { tagList, handleKeyDown };
  const imageProps = {
    fileInputRef,
    previewUrl,
    handleImageButtonClick,
    handleFileChange,
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} width={584} radius="md">
      <div className="overflow-y-auto px-[16px] py-[24px] md:px-[32px] md:py-[32px]">
        <Header mode={mode} />

        <Content
          mode={mode}
          formProps={formProps}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          onClose={onClose}
          columnList={columnList}
          memberList={memberList}
          datepickerProps={datepickerProps}
          tagsProps={tagsProps}
          imageProps={imageProps}
        />
      </div>
    </BaseModal>
  );
}
