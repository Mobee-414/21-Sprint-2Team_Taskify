'use client'
import React from  "react";
import Button from '../components/common/Button';

export default function ButtonTest () {
  const handleLogin = () => {
    alert('로그인 버튼 클릭 입니다');
  }

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-start">
      <h1 className="text-2xl font-bold mt-4 ml-20">로그인 버튼 디자인 테스트</h1>

      <Button 
        onClick={handleLogin}>
          로그인
      </Button>
    </div>
  );
}