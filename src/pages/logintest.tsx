import { useAuth } from "@/contexts/AuthProvider";
import { useEffect } from "react";

export default function TestPage() {
  const { user, isHydrated } = useAuth();

  useEffect(() => {
    console.log("logintest user:", user);
  }, [user]);

  if (!isHydrated) return null; // 하이드레이션 전엔 렌더링 안 함

  return (
    <div>
      <h1>테스트 페이지</h1>
      {user ? (
        <div>
          닉네임: {user.nickname}님 로그인 하셨습니다
          2팀 화이팅
        </div>
        
      ) : (
        <div>로그인 안됨</div>
      )}
    </div>
  );
}
