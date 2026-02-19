'use client'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import DashboardsLayout from '@/components/layout/DashboardsLayout';
import Profile from '@/pages/mypage/components/Profile';
import PasswordChange from './components/PasswordChange';

const MyPageAccount = () => {
  const router = useRouter();
    
  return (
    <DashboardsLayout
      refreshKey={0}
      onRefresh={() => {}}
      onClickPlus={() => {}}
    
    >
      <div className='flex flex-col gap-[20px]'>
        <button
          onClick={() => router.back()}
          className="flex items-center gap-[8px] w-fit text-lg text-black-500 font-medium hover:text-black transition"
        >
        <Image 
          src='/icons/arrow_forward.svg'
          alt='돌아가기'
          width={20}
          height={20}
        />
          돌아가기
        </button>

        <Profile />
        <PasswordChange />
      </div>
    </DashboardsLayout>
  );
};

export default MyPageAccount;

  