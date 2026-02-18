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
  const { formProps, selectOptions, datepickerProps, tagProps, imageProps } =
    useCardForm(onClose, onSuccess, columnId, initialData);

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} width={584} radius="md">
      <div className="overflow-y-auto px-[16px] py-[24px] tablet:px-[32px] tablet:py-[32px]">
        <Header mode={mode} />

        <Content
          mode={mode}
          formProps={formProps}
          selectOptions={selectOptions}
          datepickerProps={datepickerProps}
          tagProps={tagProps}
          imageProps={imageProps}
          onClose={onClose}
        />
      </div>
    </BaseModal>
  );
}
