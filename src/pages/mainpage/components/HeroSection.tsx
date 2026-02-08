"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { signup, login } from "@/api/auth.api";
import { AxiosError } from "axios";

const HeroSection = () => {
  const router = useRouter();

  const handleLogin = async () => {
    const now = Date.now();
    const email = `test_${now}@taskify.dev`;
    const nickname = `테스트${String(now).slice(-4)}`; 
    const password = "password123"; 

    try {
      await signup({ email, nickname, password });

      const { accessToken } = await login({ email, password });

      localStorage.setItem("accessToken", accessToken);

      router.push("/mydashboard");
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        const status = e.response?.status;
        const message =
          (e.response?.data as { message?: string })?.message ?? e.message;

        if (status === 409) {
          try {
            const { accessToken } = await login({ email, password });
            localStorage.setItem("accessToken", accessToken);
            router.push("/mydashboard");
            return;
          } catch {
            alert("이미 존재하는 이메일이지만 로그인에 실패했습니다.");
            return;
          }
        }
        alert(`실패 (${status ?? "unknown"}): ${message}`);
        return;
      }
      console.error(e);
      alert("알 수 없는 오류가 발생했습니다.");
    }
  };

  return (
    <section className="flex flex-col items-center justify-center px-6 pt-[140px] text-center">
      <Image
        src="/images/hero_section.png"
        alt="Hero Section Image"
        width={722}
        height={423}
        priority
        className="mb-10 rounded-lg shadow-lg"
      />

      <h2 className="mb-[48.24px] text-[76px] font-bold">
        새로운 일정 관리 <span className="text-[#5534DA]">Taskify</span>
      </h2>

      <button
        className="mt-[125px] h-[54px] w-[280px] rounded-md bg-[#5534DA] text-[18px] font-medium text-white"
        onClick={handleLogin}
      >
        로그인하기
      </button>
    </section>
  );
};

export default HeroSection;
