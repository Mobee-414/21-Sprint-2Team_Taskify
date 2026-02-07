'use client'

import Image from "next/image";

const Logo = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      <Image 
        src="/icons/login_logo.svg"
        alt="login_logo"
        width={200}
        height={280}
      />
      
    </div>
  );
};

export default Logo;