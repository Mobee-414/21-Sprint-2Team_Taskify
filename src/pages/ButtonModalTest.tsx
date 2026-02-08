'use client'
import dynamic from 'next/dynamic';
import {useState} from  "react";
import Image from 'next/image';
import ButtonBase from '../components/common/Button/ButtonBase';

// 클라이언트에서 필요할때만 랜더링 서버에서는 무시
const PasswordMismatch = dynamic(
  () => import('@/components/modals/LoginModal/PasswordMismatch'), { ssr: false }
);

export default function ButtonTest () {

  const [open, setOpen] = useState(false);

  return (
    <div>
    {/* 비밀번호가 일치하지 않습니다  */}
    <h1 className="text-2xl font-bold">비밀번호가 일치하지 않습니다</h1>
      <ButtonBase
        onClick={()=>setOpen(true)} 
        className="
          w-[200px] h-[50px]
          bg-[var(--color-violet-main)]
          text-white text-base font-medium
          rounded-[8px]
        "          
      >
        버튼
        <Image 
          src="/icons/add_icon.png"
          alt="더하기 +"
          width={22}
          height={22}
        />
      </ButtonBase>

      <div>
        <PasswordMismatch
          isOpen={open}
          onClose={() => setOpen(false)}
        />
      </div>
      
    </div>
  );
};
