'use client'

import Link from "next/link";

const LoginSignupLink = () => {
  return (
    <div className="flex items-center">
      <div>
        회원이 아니신가요?
      </div>

      <Link href="/signup">
        회원가입하기
      </Link>
    </div>
  );
};

export default LoginSignupLink;