'use client'

import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthProvider';

export function useLogout () {
  const router = useRouter();
  const { setUser } = useAuth();

  const logout = () => {
    // 1. 토큰삭제
    localStorage.removeItem('accessToken');
    // 2. 전역 상태 초기화
    setUser(null);
    // 3. 로그인 페이지 이동
    router.replace('/login');
  };

  return { logout };
};