import { Controller } from "react-hook-form";
import { useInvite } from "@/hooks/useInvite";
import BaseModal from "@/components/common/BaseModal";
import { Input } from "@/components/common/Input";

interface InviteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InviteModal({ isOpen, onClose }: InviteModalProps) {
  const { control, errors, isValid, handleSubmit, onSubmit } = useInvite();

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      width={730}
      radius="md"
      padding="lg"
      gap="md"
    >
      <div className=" w-[568px] max-h-[270px] px-[24px] py-[24px]">
        <div className="flex justify-between">
          <h2>초대하기</h2>
          <button onClick={onClose}>닫기</button>
        </div>

        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
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
                  labelSize="16-18"
                  labelWeight="500"
                  inputSize="14-16"
                  errorSize="12-14"
                />
              )}
            />
            <div>
              <button type="button" onClick={onClose}>
                취소
              </button>
              <button type="submit">초대</button>
            </div>
          </form>
        </div>
      </div>
    </BaseModal>
  );
}
