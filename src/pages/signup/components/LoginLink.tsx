'use client'

import Link from "next/link";

const LoginSignupLink = () => {
  return (
    <div className="flex justify-center items-center gap-2 text-center">
      <div>
        이미 회원이신가요?
      </div>

      <Link href="/login"
        className="
          text-[var(--color-violet-main)]
          font-[var(--font-weight-medium)]
          hover:underline
      ">
        로그인하기
      </Link>
    </div>
  );
};

export default LoginSignupLink;