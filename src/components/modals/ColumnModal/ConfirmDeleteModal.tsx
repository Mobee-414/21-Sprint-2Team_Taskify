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
    <BaseModal isOpen={isOpen} onClose={onClose} width={540}>
      <div
        className={`
          flex w-full flex-col items-center
          overflow-y-auto
        `}
      >
        <div className="flex flex-col items-center w-full py-4">
          <p className="text-lg md:text-xl text-black-dark font-medium mb-10 mt-4 text-center">
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
