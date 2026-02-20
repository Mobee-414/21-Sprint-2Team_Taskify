"use client";

import Image from "next/image";
import ProfileDropdown from "@/components/dropdown/feature/Profile";
import InviteModal from "@/components/modals/InviteModal";
import Tooltip from "@/components/common/Tooltip";
import { useState } from "react";
import { Member } from "@/hooks/useDashboardMembers";
import Avatar from "@/components/common/Avatar";
import MemberListModal from "@/components/modals/MemberListModal";

interface HeaderProps {
  title: string;
  isOwner?: boolean;
  members: Member[];
  totalCount: number;
  onEditClick?: () => void;
}

export default function Header({
  title,
  isOwner,
  onEditClick,
  members,
  totalCount,
}: HeaderProps) {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);

  const MAX_VISIBLE = 4;
  const visibleMembers = members?.slice(0, MAX_VISIBLE);
  const extraCount = totalCount > MAX_VISIBLE ? totalCount - MAX_VISIBLE : 0;

  return (
    <>
      <header className="flex h-[70px] items-center justify-between border-b border-gray-base bg-white px-4 tablet:pl-[40px] tablet:pr-[32px] desktop:pr-[80px]">
        {/*  대시보드 제목 및 왕관 아이콘 (PC에서만 노출) */}
        <div className="flex min-w-0 flex-1 items-center">
          <div className="hidden desktop:flex items-center">
            <Tooltip content={title} placement="bottom" onlyWhenTruncated>
              <h1 className="max-w-[520px] truncate text-[20px] font-bold text-black-medium">
                {title}
              </h1>
            </Tooltip>
            {isOwner && (
              <Image
                src="/icons/crown.svg"
                alt="소유자"
                width={20}
                height={16}
                className="ml-2 shrink-0"
              />
            )}
          </div>
        </div>

        {/* 기능 영역 (관리, 초대하기, 멤버, 프로필) */}
        <div className="flex shrink-0 items-center">
          {/* 모바일에서는 텍스트만, 태블릿 이상은 아이콘+텍스트 */}
          {isOwner && (
            <button
              onClick={onEditClick}
              className="flex items-center justify-center gap-[8px] rounded-md border border-gray-base hover:bg-gray-surface w-[52px] h-[32px] tablet:w-[88px] tablet:h-[40px]"
            >
              <Image
                src="/icons/settings.svg"
                alt=""
                width={20}
                height={20}
                className="hidden tablet:block"
              />
              <span className="text-[14px] tablet:text-[16px] font-medium text-gray-dark">
                관리
              </span>
            </button>
          )}

          <div className="w-[8px] tablet:w-[16px]" />

          {/* 모바일에서는 텍스트만, 태블릿 이상은 아이콘+텍스트 */}
          <button
            onClick={() => setIsInviteModalOpen(true)}
            className="flex items-center justify-center gap-[8px] rounded-md border border-gray-base hover:bg-gray-surface w-[73px] h-[36px] tablet:w-[116px] tablet:h-[40px]"
          >
            <Image
              src="/icons/add_box.svg"
              alt=""
              width={20}
              height={20}
              className="hidden tablet:block"
            />
            <span className="text-[14px] tablet:text-[16px] font-medium text-gray-dark">
              초대하기
            </span>
          </button>

          {/* 초대받은 멤버 */}
          <div className="flex items-center ml-[12px] tablet:ml-[24px] mr-[12px] tablet:mr-[24px]">
            <div className="flex -space-x-2">
              {visibleMembers.map((member) => (
                <div
                  key={member.id}
                  onClick={() => setIsMemberModalOpen(true)}
                  className="cursor-pointer hover:scale-120 transition-transform"
                >
                  <Avatar
                    nickname={member.nickname}
                    imageUrl={member.profileImageUrl}
                    className="w-[34px] h-[34px] tablet:w-[38px] tablet:h-[38px] border-2 border-white"
                  />
                </div>
              ))}
              {extraCount > 0 && (
                <div className="flex w-[34px] h-[34px] tablet:w-[38px] tablet:h-[38px] items-center justify-center rounded-full border-2 border-white bg-gray-medium text-[10px] tablet:text-sm font-medium text-white">
                  +{extraCount}
                </div>
              )}
            </div>
          </div>

          <div className="h-[30px] tablet:h-[40px] w-px bg-gray-base" />
          <div className="w-[12px] tablet:w-[36px]" />

          {/* 프로필 */}
          <ProfileDropdown onLogout={() => console.log("logout")} />
        </div>
      </header>

      {isInviteModalOpen && (
        <InviteModal
          isOpen={isInviteModalOpen}
          onClose={() => setIsInviteModalOpen(false)}
        />
      )}

      {isMemberModalOpen && (
        <MemberListModal
          isOpen={isMemberModalOpen}
          onClose={() => setIsMemberModalOpen(false)}
          members={members}
        />
      )}
    </>
  );
}