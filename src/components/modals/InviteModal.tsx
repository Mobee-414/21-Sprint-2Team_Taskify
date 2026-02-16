import { Controller } from "react-hook-form";
import { useInvite } from "@/hooks/useInvite";
import BaseModal from "@/components/common/BaseModal";
import { Input } from "@/components/common/Input";
import ButtonModal from "@/components/common/Button/ButtonModal";
import ButtonModalClose from "../common/Button/ButtonModalClose";

interface InviteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InviteModal({ isOpen, onClose }: InviteModalProps) {
  const { control, errors, isValid, handleSubmit, onSubmit } =
    useInvite(onClose);

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} width={568} radius={"sm"}>
      <div className="flex w-full flex-col items-center gap-[18px] tablet:gap-[24px] overflow-y-auto p-[24px]">
        <div className="flex justify-between items-center w-full">
          <h2 className="text-xl tablet:text-2xl font-bold text-black-medium">
            초대하기
          </h2>
          <ButtonModalClose onClick={onClose} />
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
          <div className="flex gap-[7px] tablet:gap-[8px] mt-[24px]">
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
              type="submit"
              fontSize={"lg"}
              className={`w-full h-[54px] ${isValid ? "" : "disabled"}`}
            >
              초대
            </ButtonModal>
          </div>
        </form>
      </div>
    </BaseModal>
  );
}
