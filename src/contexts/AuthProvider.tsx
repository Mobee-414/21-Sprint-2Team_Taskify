'use client'
import { createContext, useContext, useState, useEffect } from 'react';
import { AuthUser } from '@/types/user.type';

interface AuthContextType {
  user: AuthUser | null;
  isHydrated: boolean;
  setUser: (user: AuthUser | null) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<AuthUser | null>(null);
  const [isHydrated, setIsHydrated] = useState(false); 

  useEffect(() => {
    const stored = localStorage.getItem("user");
    /**setUserState 경고 관련
     * useEffect 내부에서 useState 호출시 해당 경고 발생
     * 렌더링 중 상태 업데이트로 인한 무한 루프 방지 경고
     * 여기서는 마운트 1회만 실행되는 초기화 로직이므로 정상 작동
     */
    if (stored) {
      setUserState(JSON.parse(stored));
    }
    setIsHydrated(true);
  }, []);

  const setUser = (newUser: AuthUser | null) => {
    if (newUser) {
      localStorage.setItem("user", JSON.stringify(newUser));
    } else {
      localStorage.removeItem("user");
    }
    setUserState(newUser);
  };

  return (
    <AuthContext.Provider value={{ user, isHydrated, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('AuthProvider로 감싸진 컴포넌트 안에서만 useAuth를 사용할수 있습니다');
  }
  return context;
}