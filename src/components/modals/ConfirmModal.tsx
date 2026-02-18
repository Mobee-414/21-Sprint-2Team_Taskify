import BaseModal from "@/components/common/BaseModal";
import ButtonModal from "@/components/common/Button/ButtonModal";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClick: () => void;
  isSubmitting?: boolean;
  children: React.ReactNode;
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onClick,
  children,
  isSubmitting = false,
}: ConfirmModalProps) {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} width={568} radius="md">
      <div
        className={`
          flex w-full flex-col items-center
          overflow-y-auto
          px-[16px] py-[24px] tablet:px-[24px]
          text-lg tablet:text-xl font-medium text-black-medium text-center
        `}
      >
        {children}
        <div className="flex gap-[7px] w-full tablet:gap-[8px] mt-[32px] tablet:mt-[40px]">
          <ButtonModal
            type="button"
            variant="secondary"
            fontSize={"lg"}
            className="w-full h-[54px]"
            onClick={onClose}
            disabled={isSubmitting}
          >
            취소
          </ButtonModal>
          <ButtonModal
            type="button"
            fontSize={"lg"}
            className="w-full h-[54px]"
            onClick={onClick}
            disabled={isSubmitting}
          >
            삭제
          </ButtonModal>
        </div>
      </div>
    </BaseModal>
  );
}
