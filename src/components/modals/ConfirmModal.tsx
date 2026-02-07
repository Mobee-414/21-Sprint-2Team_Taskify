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
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      width={730}
      radius="md"
      padding="md"
      gap="lg"
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
    </BaseModal>
  );
}
