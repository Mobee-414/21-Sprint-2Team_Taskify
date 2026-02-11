import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from '@/api/auth.api';
import axios from 'axios';

// 스키마
const LoginSchema = z.object({
  email: z 
    .string()
    .nonempty("이메일을 입력해주세요.")
    .email("잘못된 이메일 형식입니다."),
  password: z
    .string()
    .nonempty("비밀번호를 입력해주세요.")
    .min(8, "비밀번호를 8자 이상 입력해주세요."),
});

type LoginValues = z.infer<typeof LoginSchema>;

// 훅
export function useLogin() {
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<LoginValues>({
    resolver: zodResolver(LoginSchema),
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // submit logic
  const onSubmit = async (data: LoginValues) => {
    try {
      const res = await login(data); // 서버 호출

      // accessToken 저장
      localStorage.setItem("accessToken", res.accessToken); // 로그인 성공시 토큰 저장

      console.log("로그인 성공:", res.user);
      return res.user;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          success: false,
          status: error.response?.status,
          message: error.response?.data?.message ?? "로그인에 실패했습니다",
          
        };
      }
      return {
        success: false,
        message: "알 수 없는 오류가 발생했습니다.",
      }
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