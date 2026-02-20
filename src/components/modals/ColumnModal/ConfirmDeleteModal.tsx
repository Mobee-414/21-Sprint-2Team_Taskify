import BaseModal from "@/components/common/BaseModal";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmDeleteModal({
  isOpen,
  onClose,
  onConfirm,
}: ConfirmDeleteModalProps) {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} radius="sm">
      <div
        className={`
          w-[300px] tablet:w-[540px] mx-auto px-6 tablet:px-8 py-8
        `}
      >
        <div className="flex flex-col gap-10">
          <p className="text-lg tablet:text-xl text-black-dark font-medium mb-10 mt-4 text-center">
            컬럼의 모든 카드가 삭제됩니다.
          </p>

          <div className="flex gap-3 w-full justify-center">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border border-gray-base rounded-[8px] text-violet-main font-medium hover:bg-gray-50 transition-colors"
            >
              취소
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="flex-1 py-3 bg-violet-main text-white rounded-[8px] font-medium hover:bg-violet-dark transition-colors"
            >
              삭제
            </button>
          </div>
        </div>
      </div>
    </BaseModal>
  );
}
