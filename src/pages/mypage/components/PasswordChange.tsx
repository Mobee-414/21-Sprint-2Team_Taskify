'use client';

import { useForm, Controller } from 'react-hook-form';
import { Input } from '@/components/common/Input';
import BaseButton from '@/components/common/Button/ButtonBase';
import { useState } from 'react';
import { changePassword } from '@/api/auth.api';
import { AxiosError } from 'axios';
import NoticeModal from '@/components/modals/NoticeModal';
import { showToast } from "@/contexts/ToastProvider";

interface PasswordChangeFormValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const PasswordChange = () => {
  const [ loading, setLoading ] = useState(false);
  const [ isMismatchOpen, setIsMismatchOpen] = useState(false);
  
  const { control, handleSubmit, watch, formState:{isDirty, isValid} } = useForm<PasswordChangeFormValues>({
    mode: 'onChange',
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const newPassword = watch('newPassword');
  const confirmPassword = watch('confirmPassword');

  const onSubmit = async (data: PasswordChangeFormValues) => {
      if (data.newPassword !== data.confirmPassword) {
      setIsMismatchOpen(true);
      return;
    }

    try {
      setLoading(true);
      await changePassword({
        password: data.currentPassword,
        newPassword: data.newPassword,
      });

      showToast.success('비밀번호가 변경되었습니다.');
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error(axiosError);

      if (axiosError.response?.status === 400) {
        alert('현재 비밀번호가 틀립니다.');
      } else {
        alert('비밀번호 변경 실패');
      }
    } finally {
      setLoading(false);
    }    
  };

  return (
    <div className="bg-white px-[24px] py-[24px] rounded-[12px] w-[284px] md:w-[548px] lg:w-[672px]">
      <h2 className="text-xl font-bold mb-[24px]">비밀번호 변경</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-[16px]">
          {/* 현재 비밀번호 */}
          <div className="w-[252px] md:w-[500px] lg:w-[624px]">
            <Controller
              name="currentPassword"
              control={control}
              rules={{ required: '현재 비밀번호를 입력해주세요.'}}
              render={({ field, fieldState }) => (
                <Input
                  label="현재 비밀번호"
                  field={field}
                  type="password"
                  placeholder="비밀번호 입력"
                  error={fieldState.error?.message}                  
                />
              )}
            />
          </div>
          {/* 새 비밀번호 */}
          <div className="w-[252px] md:w-[500px] lg:w-[624px]">
            <Controller
              name="newPassword"
              control={control}
              rules={{ required: '새 비밀번호를 입력해주세요' }}
              render={({ field, fieldState }) => (
                <Input
                  label="새 비밀번호"
                  field={field}
                  type="password"
                  placeholder="새 비밀번호 입력"
                  error={fieldState.error?.message}                  
                />
              )}
            />
          </div>
          {/* 새 비밀번호 확인 */}
          <div className="w-[252px] md:w-[500px] lg:w-[624px]">
            <Controller
              name="confirmPassword"
              control={control}
              rules={{ required: '새 비밀번호 확인을 입력해주세요' }}
              render={({ field, fieldState }) => (
                <Input
                  label="새 비밀번호 확인"
                  field={field}
                  type="password"
                  placeholder="새 비밀번호 입력"
                  error={
                    fieldState.error?.message ||
                    (confirmPassword && newPassword !== confirmPassword
                      ? '비밀번호가 일치하지 않습니다.'
                      : undefined)
                  }
                />
              )}
            />
          </div>
          <BaseButton
            type="submit"
            disabled={!isDirty || !isValid || loading}
            className="w-[252px] h-[54px] md:w-[500px] lg:w-[624px] bg-violet-main text-white rounded-[8px] text-lg font-semibold"
          >
            변경
          </BaseButton>
        </div>
      </form>

          <NoticeModal 
            isOpen={isMismatchOpen}
            onClose={() => setIsMismatchOpen(false)}
            message="비밀번호가 일치하지 않습니다."          
          />
    </div>
  );
};

export default PasswordChange;