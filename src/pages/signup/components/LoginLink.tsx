'use client'

import Link from "next/link";

const LoginSignupLink = () => {
  return (
    <div className="flex items-center gap-2">
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