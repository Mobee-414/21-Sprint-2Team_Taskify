'use client'

import Link from "next/link";

const LoginSignupLink = () => {
  return (
    <div className="flex justify-center items-center gap-2 text-center">
      <div>
        회원이 아니신가요?
      </div>

      <Link href="/signup"
        className="
          text-[var(--color-violet-main)]
          font-[var(--font-weight-medium)]
          hover:underline
      ">
        회원가입하기
      </Link>
    </div>
  );
};

export default LoginSignupLink;