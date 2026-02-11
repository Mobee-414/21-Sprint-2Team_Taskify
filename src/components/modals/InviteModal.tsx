import { Controller } from "react-hook-form";
import { useInvite } from "@/hooks/useInvite";
import BaseModal from "@/components/common/BaseModal";
import { Input } from "@/components/common/Input";
import ButtonCheckCancel from "@/components/common/Button/ButtonCheckCancel";

interface InviteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InviteModal({ isOpen, onClose }: InviteModalProps) {
  const { control, errors, isValid, handleSubmit, onSubmit } =
    useInvite(onClose);

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} width={730}>
      <div className="flex justify-between items-center w-full mb-[18px] md:mb-[24px]">
        <h2 className="text-xl md:text-2xl font-bold text-black-medium">
          초대하기
        </h2>
        <button onClick={onClose}>닫기</button>
      </div>

      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              label="이메일"
              field={field}
              type="email"
              placeholder="이메일을 입력해주세요"
              error={errors.email?.message}
              labelSize="labelLg"
              labelWeight="medium"
              inputSize="inputMd"
              errorSize="errorSm"
            />
          )}
        />
        <div className="flex gap-[8px] mt-[24px]">
          {/* <ButtonCheckCancel
            type="button"
            variant="secondary"
            fontSize={"lg"}
            className="w-full h-[54px]"
            onClick={onClose}
          >
            취소
          </ButtonCheckCancel>
          <ButtonCheckCancel
            type="submit"
            fontSize={"lg"}
            className={`w-full h-[54px] ${isValid ? "" : "disabled"}}`}
          >
            초대
          </ButtonCheckCancel> */}
        </div>
      </form>
    </BaseModal>
  );
}
