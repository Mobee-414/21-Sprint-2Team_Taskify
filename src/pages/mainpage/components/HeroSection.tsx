"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { login } from "@/api/auth.api";
import { signup } from "@/api/users.api";
import { AxiosError } from "axios";

const HeroSection = () => {
  const router = useRouter();

  const handleLogin = async () => {
    const email = process.env.NEXT_PUBLIC_TEST_EMAIL!;
    const nickname = process.env.NEXT_PUBLIC_TEST_NICKNAME!;
    const password = process.env.NEXT_PUBLIC_TEST_PASSWORD!;

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
            alert("테스트 계정 로그인에 실패했습니다.");
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
    <section className="flex flex-col items-center justify-center px-4 pt-[140px] text-center">
      <Image
        src="/images/hero_section.png"
        alt="Hero Section Image"
        width={722}
        height={423}
        priority
        className="
          mb-10 h-auto
          w-[clamp(287px,70vw,722px)]
          rounded-lg shadow-lg
        "
      />

      <h2 className="mb-12 font-bold leading-tight">
        <span
          className="
            block
            tablet:inline
            text-[40px]
            tablet:text-[56px]
            desktop:text-[76px]
          "
        >
          새로운 일정 관리
        </span>

        <span
          className="
            block
            tablet:inline tablet:ml-3
            text-[42px]
            tablet:text-[70px]
            desktop:text-[90px]
            text-violet-main
          "
        >
          Taskify
        </span>
      </h2>

      <button
        className="
          h-[46px] w-[235px]
          tablet:h-[54px] tablet:w-[280px]
          rounded-md bg-violet-main
          text-[14px] tablet:text-[18px]
          font-medium text-white
        "
        onClick={handleLogin}
      >
        로그인하기
      </button>
    </section>
  );
};

export default HeroSection;
