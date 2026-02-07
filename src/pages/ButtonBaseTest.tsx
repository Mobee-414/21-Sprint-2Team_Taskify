'use client'
import React from  "react";
import Image from 'next/image';
import ButtonBase from '../components/common/Button/ButtonBase';

export default function ButtonTest () {

  return (
    <div>
      <ButtonBase 
        className="
          w-full h-[50px]
          bg-[var(--color-violet-main)]
          text-white text-base font-medium
          rounded-[8px]
          hover:bg-[var(--color-purple-deep)]
        "          
      >
        로그인
        <Image 
          src="/icons/add_icon.png"
          alt="더하기 +"
          width={22}
          height={22}
        />
      </ButtonBase>
    </div>
  );
};
