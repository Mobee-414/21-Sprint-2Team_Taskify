'use client';

import BaseModal from "@/components/common/BaseModal";
import ButtonCheckCancel from "@/components/common/Button/ButtonCheckCancel";

interface PasswordMismatchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PasswordMismatchModal({
  isOpen,
  onClose,
}: PasswordMismatchModalProps) {
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      width={368}
      radius="md"
      padding="md"
      gap="sm"
    >
      <div className="
        w-full
        h-[144px]
        flex flex-col justify-center items-center
        max-md:w-full
        max-md:h-[172px]
      ">
        <div className="
          text-center
          font-medium text-[#333236]
          text-[20px] leading-[32px]
          max-md:text-[16px] max-md:leading-[24px]
          mb-[24px]
          max-md:mb-[28px]
        ">
          비밀번호가 일치하지 않습니다.
        </div>
        <ButtonCheckCancel
          onClick={onClose}
          className="
            flex justify-center items-center
            w-[240px] h-[48px] rounded-[8px] 
            bg-[#5534DA]             
            max-md:w-[138px] max-md:h-[42px]
          "
        >
          <span className="
            font-semibold text-[16px] leading-[26px] text-white
            max-md:text-[14px] max-md:leading-[24px]
          ">
            확인
          </span>
        </ButtonCheckCancel>
      </div>
    </BaseModal>
  );
}