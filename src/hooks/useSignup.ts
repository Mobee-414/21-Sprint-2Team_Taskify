'use client'

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { signup } from '@/api/users.api';
import axios from 'axios';

// 스키마
const SignupSchema = z.object({
  email: z 
    .string()
    .nonempty("이메일을 입력해주세요.")
    .email("잘못된 이메일 형식입니다."),
  nickname: z
    .string()
    .nonempty("닉네임을 입력해주세요"),
  password: z
    .string()
    .nonempty("비밀번호를 입력해주세요.")
    .min(8, "비밀번호를 8자 이상 입력해주세요."),
  passwordConfirmation: z
    .string()
    .nonempty("비밀번호를 입력해주세요.")
    .min(8, "비밀번호를 8자 이상 입력해주세요."),
  terms: z
      .boolean()
      .refine(val => val === true, {
        message: "이용약관에 동의해주세요",
      }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
  message: "비밀번호가 일치하지 않습니다",
  path: ["passwordConfirmation"],
});

type SignupValues = z.infer<typeof SignupSchema>;

// 훅
export function useSignup() {


  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<SignupValues>({
    resolver: zodResolver(SignupSchema),
    mode: "all",
    defaultValues: {
      email: "",
      nickname: "",
      password: "",
      passwordConfirmation: "",
      terms: false,
    },
  });

  // submit logic
  const onSubmit = async (data: SignupValues) => {
    try {
      await signup({
        email: data.email,
        nickname: data.nickname,
        password: data.password,
      });
      return {success:true};

    } catch (error) {
        if (axios.isAxiosError(error)) {
          return {
          success: false,
          status: error.response?.status,
          message: error.response?.data?.message ?? "회원가입에 실패했습니다",
          
          };
        }
      return {
        success: false,
        message: "알 수 없는 오류가 발생했습니다."
      };
    }
  };

  return {
    control,
    errors,
    isValid,
    handleSubmit,
    onSubmit,
  };
};