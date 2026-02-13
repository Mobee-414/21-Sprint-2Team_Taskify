import Profile from '@/pages/mypage/components/Profile';
import PasswordChange from './components/PasswordChange';

const MyPageAccount = () => {
    
  return (
    <div className='flex flex-col gap-[8px] bg-gray-light min-h-screen'>
      <Profile />
      <PasswordChange />
    </div>
  );
};

export default MyPageAccount;

  