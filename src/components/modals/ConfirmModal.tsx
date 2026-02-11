import BaseModal from "@/components/common/BaseModal";

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
    <BaseModal isOpen={isOpen} onClose={onClose} width={730} radius="md">
      <div
        className={`
          flex w-full flex-col items-center
          overflow-y-auto
        `}
      >
        {children}
        <div>
          <button type="button" onClick={onClose}>
            취소
          </button>
          <button type="button" onClick={onClick}>
            삭제
          </button>
        </div>
      </div>
    </BaseModal>
  );
}
