'use client'

import { Controller } from "react-hook-form";
import { useSignup } from "@/hooks/useSignup";
import { Input } from "@/components/common/Input";
import LoginButton from "@/components/common/Button/ButtonLogin";
import NoticeModal from "@/components/modals/NoticeModal";
import { useState } from "react";

interface SignupFormValues {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
  terms: boolean;
}

const SignupForm = () => {
  const { control, errors, isValid, handleSubmit, onSubmit } = useSignup();

  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isEmailUsedOpen, setIsEmailUsedOpen] = useState(false);

  const handleSignup = async (data: SignupFormValues) => {
    const result = await onSubmit(data);

    if (typeof result === "object" && "success" in result && result.success === false) {
      if (result.status === 409) {
        setIsEmailUsedOpen(true);
      }
      return;
    }

    if (typeof result === "object" && result.success === true) {
      setIsSuccessOpen(true);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleSignup)}>
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
              labelSize="labelSm"
              labelWeight="normal"
              inputSize="inputMd"
              errorSize="errorSm"
            />
          )}
        />

      <div className='mt-4'>
        <Controller
          name="nickname"
          control={control}
          render={({ field }) => (
            <Input
              label="닉네임"
              field={field}
              type="text"
              placeholder="닉네임을 입력해주세요"
              error={errors.nickname?.message}
              labelSize="labelSm"
              labelWeight="normal"
              inputSize="inputMd"
              errorSize="errorSm"
            />
          )}
        />
      </div>  

      <div className='mt-4'>
        <Controller
          name="password" 
          control={control}
          render={({ field }) => (
            <Input
              label="비밀번호"
              field={field}
              type="password"
              placeholder="비밀번호를 입력해주세요"
              required={true}
              error={errors.password?.message}
              labelSize="labelSm"
              labelWeight="medium"
              inputSize="inputLg"
            />
          )}
        />
        </div>  

      <div className='mt-4'>
        <Controller
          name="passwordConfirmation" 
          control={control}
          render={({ field }) => (
            <Input
              label="비밀번호 확인"
              field={field}
              type="password"
              placeholder="비밀번호를 한번 더 입력해주세요"
              required={true}
              error={errors.passwordConfirmation?.message}
              labelSize="labelSm"
              labelWeight="medium"
              inputSize="inputLg"
            />
          )}
        />
        </div> 
        
        <div className="mt-2">
          <Controller
            name="terms"
            control={control}
            render={({ field }) => (
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={e => field.onChange(e.target.checked)}
                  />
                  <span>이용약관에 동의합니다.</span>
                </label>

                {errors.terms && (
                  <span className="text-xs text-red-point whitespace-nowrap">
                    {errors.terms.message}
                  </span>
                )}
              </div>
              )}
            />
        </div>
        
        <div className='mt-4'>      
          <LoginButton 
            variant={isValid ? "primary" : "secondary"}
            fontSize="lg"
            disabled={!isValid}
          >
            가입하기
          </LoginButton>
        </div>      
      </form>

      {/* 가입 완료 모달 */}
      <NoticeModal
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        message="가입이 완료되었습니다."
      />

      {/* 이미 사용중인 이메일 모달 */}
      <NoticeModal
        isOpen={isEmailUsedOpen}
        onClose={() => setIsEmailUsedOpen(false)}
        message="이미 사용중인 이메일입니다."
      />

    </div>
  )
}

export default SignupForm;