'use client'

import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthProvider';
import { showToast} from '@/contexts/ToastProvider';

export function useLogout () {
  const router = useRouter();
  const { setUser } = useAuth();

  const logout = () => {
    // 1. 토큰삭제
    localStorage.removeItem('accessToken');
    // 2. 전역 상태 초기화
    setUser(null);
    // 3. 토스트 보여주기
    showToast.success('로그아웃 되었습니다.');
    // 4. 메인 페이지 이동
    router.replace('/');
  };

  return { logout };
};