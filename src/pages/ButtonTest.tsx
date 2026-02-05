// 버튼 샘플 테스트 입니다.
'use client'
import React from  "react";
import ButtonLogin from '../components/common/Button/ButtonLogin';
import ButtonBase from '../components/common/Button/ButtonBase';
import ButtonModal from '../components/common/Button/ButtonModal';
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
            fontSize="md"
          >
            로그인
          </ButtonLogin>

          <div className="flex flex-col">
            <ButtonLogin 
              disabled 
              onClick={() => handleClick('disabled')}
              variant="secondary"
            >
              로그인
            </ButtonLogin>
          </div>

          <ButtonLogin 
            onClick = {() => handleClick('로그인')}
            variant="primary"
            fontSize="md"
            loginWidth="mobile"
          >
            로그인
          </ButtonLogin>

          <div className="flex flex-col">
            <ButtonLogin 
              disabled 
              onClick={() => handleClick('disabled')}
              variant="secondary"
              loginWidth="mobile"
            >
              로그인
            </ButtonLogin>
          </div>

        {/* ButtonBase */}
        <h1 className="text-2xl font-bold">수락 거절 버튼</h1>
          <ButtonBase 
            onClick = {() => handleClick('로그인')}
            variant="primary"
            fontSize="md"
            acceptSize="desktop"
          >
            수락
          </ButtonBase>

          <div className="flex flex-col">
            <ButtonBase 
              disabled 
              onClick={() => handleClick('disabled')}
              variant="secondary"
              acceptSize="desktop"
            >
              거절
            </ButtonBase>
          </div>

            <ButtonBase 
            onClick = {() => handleClick('로그인')}
            variant="primary"
            fontSize="md"
            acceptSize="tablet"
          >
            수락
          </ButtonBase>

          <div className="flex flex-col">
            <ButtonBase 
              disabled 
              onClick={() => handleClick('disabled')}
              variant="secondary"
              acceptSize="tablet"
            >
              거절
            </ButtonBase>
          </div>

            <ButtonBase 
            onClick = {() => handleClick('로그인')}
            variant="primary"
            fontSize="md"
            acceptSize="mobile"
          >
            수락
          </ButtonBase>

          <div className="flex flex-col">
            <ButtonBase 
              disabled 
              onClick={() => handleClick('disabled')}
              variant="secondary"
              acceptSize="mobile"
            >
              거절
            </ButtonBase>
          </div>


{/* ButtonModal */}
        <h1 className="text-2xl font-bold">모달 버튼</h1>
          <ButtonModal 
            onClick = {() => handleClick('로그인')}
            variant="primary"
            fontSize="md"    
            loginWidth="desktop"        
          >
            확인
          </ButtonModal>

          <div className="flex flex-col">
            <ButtonModal 
              disabled 
              onClick={() => handleClick('disabled')}
              variant="secondary"
              loginWidth="mobile"
            >
              확인
            </ButtonModal>
          </div>

          <ButtonModal 
            onClick = {() => handleClick('로그인')}
            variant="primary"
            fontSize="md"         
            loginWidth="desktop"   
          >
            취소
          </ButtonModal>

          <div className="flex flex-col">
            <ButtonModal
              disabled 
              onClick={() => handleClick('disabled')}
              variant="secondary"
              loginWidth="mobile"
            >
              취소
            </ButtonModal>
          </div>

          {/* ButtonColumnAdd */}
          <h1 className="text-2xl font-bold">버튼 컬럼추가</h1>

          <ButtonColumnAdd 
            onClick = {() => handleClick('로그인')} 
            variant="secondary" 
            acceptSize="desktop"                    
          >
            새로운 컬럼 추가하기
          </ButtonColumnAdd>

          <div className="flex flex-col">
            <ButtonColumnAdd 
              onClick={() => handleClick('disabled')}
              variant="secondary"              
              acceptSize="tablet"
            >
              새로운 컬럼 추가하기
            </ButtonColumnAdd>
          </div>

          <ButtonColumnAdd 
            onClick = {() => handleClick('로그인')}
            variant="secondary"
            acceptSize="mobile" 
          >
            새로운 컬럼 추가하기
          </ButtonColumnAdd>

          {/* ButtonTodoAdd */}
          <h1 className="text-2xl font-bold">투두 추가</h1>

          <ButtonColumnAdd 
            onClick = {() => handleClick('로그인')} 
            variant="secondary" 
            acceptSize="desktop"                    
          >
            +
          </ButtonColumnAdd>

          <div className="flex flex-col">
            <ButtonColumnAdd 
              onClick={() => handleClick('disabled')}
              variant="secondary"              
              acceptSize="tablet"
            >
              +
            </ButtonColumnAdd>
          </div>

          <ButtonColumnAdd 
            onClick = {() => handleClick('로그인')}
            variant="secondary"
            acceptSize="mobile" 
          >
            +
          </ButtonColumnAdd>

          {/* ButtonDashboardAdd */}
          <h1 className="text-2xl font-bold">대시보드 추가</h1>
          <ButtonDashboardAdd 
            onClick = {() => handleClick('로그인')} 
            variant="secondary" 
            acceptSize="desktop"                    
          >
            새로운 대시보드 +
          </ButtonDashboardAdd>

          <div className="flex flex-col">
            <ButtonDashboardAdd 
              onClick={() => handleClick('disabled')}
              variant="secondary"              
              acceptSize="tablet"
            >
              새로운 대시보드 +
            </ButtonDashboardAdd>
          </div>

          <ButtonDashboardAdd 
            onClick = {() => handleClick('로그인')}
            variant="secondary"
            acceptSize="mobile" 
          >
            새로운 대시보드 +
          </ButtonDashboardAdd>

          {/* ButtonDashboardDelete */}
          <h1 className="text-2xl font-bold">대시보드 삭제</h1>
          <ButtonDashboardDelete 
            onClick = {() => handleClick('로그인')} 
            variant="secondary" 
            acceptSize="desktop"                    
          >
            대시보드 삭제
          </ButtonDashboardDelete>

          <div className="flex flex-col">
            <ButtonDashboardDelete 
              onClick={() => handleClick('disabled')}
              variant="secondary"              
              acceptSize="tablet"
            >
              대시보드 삭제
            </ButtonDashboardDelete>
          </div>

          <ButtonDashboardDelete 
            onClick = {() => handleClick('로그인')}
            variant="secondary"
            acceptSize="mobile" 
          >
            대시보드 삭제
          </ButtonDashboardDelete>

      </div>
  );
};