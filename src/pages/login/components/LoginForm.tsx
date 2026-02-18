'use client';
import { useState } from 'react';
import { Controller } from "react-hook-form";
import { useLogin } from "@/hooks/useLogin";
import { Input } from "@/components/common/Input";
import LoginButton from "@/components/common/Button/ButtonLogin";
import NoticeModal from "@/components/modals/NoticeModal";
import type { LoginValues } from '@/hooks/useLogin';

const LoginForm = () => {
  const { control, errors, isValid, handleSubmit, onSubmit } = useLogin();

  // 모달
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleLogin = async (data: LoginValues) => {
    const result = await onSubmit(data);

    // 실패 객체일 때만 모달 띄우기
    if (typeof result === "object" && "success" in result && result.success === false) {
      switch (result.status) {
        case 400:
          setModalMessage("로그인에 실패했습니다.");
          break;
        case 401:
          setModalMessage("비밀번호가 일치하지않습니다.");
          break;
        case 404:
          setModalMessage("가입되지 않은 이메일입니다.");
          break;
        default:
          setModalMessage(result.message ?? "로그인에 실패했습니다.");
      }
      setIsModalOpen(true);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleLogin)}>
        <Controller
          name="email"
          control={control}
          defaultValue=""
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
          name="password" 
          control={control}
          defaultValue=""
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
          <LoginButton 
            variant={isValid ? "primary" : "secondary"}
            fontSize="lg" 
            disabled={!isValid}
          >
            로그인
          </LoginButton>
        </div>  
      </form>

      {/* 실패 모달 */}
      <NoticeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message={modalMessage}
      />
    </div>
  );
};

export default LoginForm;