import BaseModal from "@/components/common/BaseModal";
import ButtonModal from "@/components/common/Button/ButtonModal";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClick: () => void;
  children: React.ReactNode;
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onClick,
  children,
}: ConfirmModalProps) {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} width={568} radius="md">
      <div
        className={`
          flex w-full flex-col items-center
          overflow-y-auto}
          px-[16px] py-[24px] md:px-[24px]
          text-lg md:text-xl font-medium text-black-medium text-center
        `}
      >
        {children}
        <div className="flex gap-[7px] w-full md:gap-[8px] mt-[32px] md:mt-[40px]">
          <ButtonModal
            type="button"
            variant="secondary"
            fontSize={"lg"}
            className="w-full h-[54px]"
            onClick={onClose}
          >
            취소
          </ButtonModal>
          <ButtonModal
            type="button"
            fontSize={"lg"}
            className={`w-full h-[54px]`}
            onClick={onClick}
          >
            삭제
          </ButtonModal>
        </div>
      </div>
    </BaseModal>
  );
}
