'use client';

import { useForm, Controller } from 'react-hook-form';
import { Input } from '@/components/common/Input';
import BaseButton from '@/components/common/Button/ButtonBase';

interface PasswordChangeFormValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const PasswordChange = () => {
  const { control, handleSubmit } = useForm<PasswordChangeFormValues>({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: PasswordChangeFormValues) => {
    console.log(data);
  };

  return (
    <div className="bg-white px-[24px] py-[24px]">
      <h2 className="text-xl font-bold mb-[24px]">비밀번호 변경</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-[16px]">
          <div className="w-[252px] md:w-[500px] lg:w-[624px]">
            <Controller
              name="currentPassword"
              control={control}
              render={({ field }) => (
                <Input
                  label="현재 비밀번호"
                  field={field}
                  type="password"
                  placeholder="비밀번호 입력"
                />
              )}
            />
          </div>
          <div className="w-[252px] md:w-[500px] lg:w-[624px]">
            <Controller
              name="newPassword"
              control={control}
              render={({ field }) => (
                <Input
                  label="새 비밀번호"
                  field={field}
                  type="password"
                  placeholder="새 비밀번호 입력"
                />
              )}
            />
          </div>
          <div className="w-[252px] md:w-[500px] lg:w-[624px]">
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <Input
                  label="새 비밀번호 확인"
                  field={field}
                  type="password"
                  placeholder="새 비밀번호 입력"
                />
              )}
            />
          </div>
          <BaseButton
            type="submit"
            className="w-[252px] h-[54px] md:w-[500px] lg:w-[624px] bg-violet-main text-white rounded-[8px] text-lg font-semibold"
          >
            변경
          </BaseButton>
        </div>
      </form>
    </div>
  );
};

export default PasswordChange;