'use client'
import Link from "next/link";
import Image from "next/image";

const Logo = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      <Link href="/">
        <Image 
          src="/icons/login_logo.svg"
          alt="login_logo"
          width={200}
          height={280}
        />
      </Link>
    </div>
  );
};

export default Logo;