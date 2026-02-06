 // 버튼 샘플 테스트 입니다.
'use client'
import React from  "react";
import Image from 'next/image';
import ButtonLogin from '../components/common/Button/ButtonLogin';
import ButtonAcceptReject from '../components/common/Button/ButtonAcceptReject';
import ButtonCheckCancel from '../components/common/Button/ButtonCheckCancel';
import ButtonInputDelete from '@/components/common/Button/ButtonInputDelete';
import ButtonTodoAdd from '../components/common/Button/ButtonTodoAdd';
import ButtonColumnAdd from '@/components/common/Button/ButtonColumnAdd';
import ButtonDashboardAdd from '@/components/common/Button/ButtonDashboardAdd';
import ButtonDashboardDelete from '@/components/common/Button/ButtonDashboardDelete';


export default function ButtonTest () {
  const handleClick = (name: string) => {
    alert(`${name} 버튼 클릭 입니다`);
  }

  return (
      <div className="bg-gray-50 min-h-screen flex flex-col items-start gap-6 p-6">
        {/* ButtonLogin */}
        <h1 className="text-2xl font-bold">로그인 버튼</h1>
          <ButtonLogin 
            onClick = {() => handleClick('로그인')}
            variant="primary"            
          >
            로그인
          </ButtonLogin>

          <div className="flex flex-col">
            <ButtonLogin               
              onClick={() => handleClick('disabled')}
              variant="secondary"
            
            >
              로그인
            </ButtonLogin>
          </div>

          {/* ButtonAcceptReject */}
          <h1 className="text-2xl font-bold">수락 거절 버튼</h1>
          <ButtonAcceptReject 
            onClick = {() => handleClick('로그인')}
            variant="primary"            
          >
            수락
          </ButtonAcceptReject>

          <div className="flex flex-col">
            <ButtonAcceptReject               
              onClick={() => handleClick('disabled')}
              variant="secondary"            
            >
              거절
            </ButtonAcceptReject>
          </div>

          {/* ButtonCheckCancel */}
          <h1 className="text-2xl font-bold">확인 취소 버튼</h1>
          <ButtonCheckCancel 
            onClick = {() => handleClick('로그인')}
            variant="primary"            
          >
            확인
          </ButtonCheckCancel>

          <div className="flex flex-col">
            <ButtonCheckCancel               
              onClick={() => handleClick('disabled')}
              variant="secondary"            
            >
              취소
            </ButtonCheckCancel>
          </div>

          {/* ButtonInputDelete */}
          <h1 className="text-2xl font-bold">입력 삭제 버튼</h1>
          <ButtonInputDelete 
            onClick = {() => handleClick('로그인')}
            variant="secondary"            
          >
            입력
          </ButtonInputDelete>

          <div className="flex flex-col">
            <ButtonInputDelete               
              onClick={() => handleClick('disabled')}
              variant="secondary"            
            >
              삭제
            </ButtonInputDelete>
          </div>

          {/* ButtonTodoAdd */}
          <h1 className="text-2xl font-bold">투두 + 버튼</h1>
          <ButtonTodoAdd 
            onClick = {() => handleClick('로그인')}
            variant="secondary"            
          >
            <Image 
              src="/icons/add_icon.png"
              alt= "add"
              width={22}
              height={22}
              className="
                w-[20px] h-[20px]
                md:w-[22px] md:h-[22px]
                "
            />
          </ButtonTodoAdd>

          {/* ButtonColumnAdd */}
          <h1 className="text-2xl font-bold">컬럼 추가 버튼</h1>
          <ButtonColumnAdd 
            onClick = {() => handleClick('로그인')}
            variant="secondary"            
          >
            새로운 컬럼 추가하기
            <Image 
              src="/icons/add_icon.png"
              alt= "add"
              width={22}
              height={22}
              className="
                w-[20px] h-[20px]
                md:w-[22px] md:h-[22px]
                "
            />
          </ButtonColumnAdd>

          {/* ButtonDashboardAdd */}
          <h1 className="text-2xl font-bold">대시보드 추가 버튼</h1>
          <ButtonDashboardAdd 
            onClick = {() => handleClick('로그인')}
            variant="secondary"            
          >
            새로운 대시보드
            <Image 
              src="/icons/add_icon.png"
              alt= "add"
              width={22}
              height={22}
              className="
                w-[20px] h-[20px]
                md:w-[22px] md:h-[22px]
                "
            />
          </ButtonDashboardAdd>

          {/* ButtonColumnAdd */}
          <h1 className="text-2xl font-bold">대시보드 삭제 버튼</h1>
          <ButtonDashboardDelete 
            onClick = {() => handleClick('로그인')}
            variant="secondary"            
          >
            대시보드 삭제하기
          </ButtonDashboardDelete>
      </div>
  );
};