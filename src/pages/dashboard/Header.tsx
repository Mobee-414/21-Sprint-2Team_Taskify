"use client";

import Image from "next/image";
import { useRouter } from "next/router";
import ProfileDropdown from "@/components/dropdown/feature/Profile";
import InviteModal from "@/components/modals/InviteModal";
import { useState } from "react";
import Avatar from "@/components/common/Avatar";
import { Member } from "@/hooks/useDashboardMembers";

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
  members,
  totalCount,
  onEditClick,
}: HeaderProps) {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const MAX_VISIBLE_MEMBERS = 4;
  const visibleMembers = members?.slice(0, MAX_VISIBLE_MEMBERS);
  const extraCount =
    totalCount > MAX_VISIBLE_MEMBERS ? totalCount - MAX_VISIBLE_MEMBERS : 0;


  return (
    <header
      className="
        flex h-[70px]
        items-center
        justify-between
        border-b border-gray-base
        bg-white
        pl-[40px] pr-[80px]
      "
    >
      <div className="flex items-center">
        <h1 className="text-[20px] font-bold text-[#333236]">{title}</h1>
        {isOwner && (
          <Image
            src="/icons/crown.svg"
            alt="소유자"
            width={20}
            height={16}
            className="m-2"
          />
        )}
      </div>

      <div className="flex items-center">
        {isOwner && (
          <button
            type="button"
            onClick={onEditClick}
            className="
              flex items-center
              w-[88px] h-[40px]
              rounded-md border border-gray-base
              text-[16px] font-medium text-[#787486]
              hover:bg-gray-surface cursor-pointer
            "
          >
            <span className="ml-[16px] mr-[8px] flex items-center">
              <Image
                src="/icons/settings.svg"
                alt="관리"
                width={20}
                height={20}
              />
            </span>
            관리
          </button>
        )}

        <div className="w-[16px]" />
        <button
          type="button"
          onClick={() => setIsInviteModalOpen(true)}
          className="
            flex items-center
            w-[116px] h-[40px]
            rounded-md border border-gray-base
            text-[16px] font-medium text-[#787486]
            hover:bg-gray-surface cursor-pointer
          "
        >
          <span className="ml-[16px] mr-[8px] flex items-center">
            <Image src="/icons/add_box.svg" alt="초대하기" width={20} height={20} />
          </span>
          초대하기
        </button>

        <div className="flex items-center ml-[24px] mr-[24px]">
          <div className="flex -space-x-2">
            {visibleMembers.map((member) => (
              <Avatar
                key={member.id}
                nickname={member.nickname}
                imageUrl={member.profileImageUrl}
                className="w-8 h-8 border-2 border-white"
              />
            ))}
            {extraCount > 0 && (
              <div
                className="
                  w-8 h-8 rounded-full border-2 border-white 
                  flex items-center justify-center 
                  text-sm font-medium text-white bg-gray-medium"
              >
                +{extraCount}
              </div>
            )}
          </div>
        </div>

        <div className="w-[36px]" />
        <div className="h-[40px] w-px bg-gray-base" />
        <div className="w-[36px]" />

        <ProfileDropdown
          nickname="배유철"
          profileImageUrl={null}
          avatarColor="#7AC555"
          onLogout={() => console.log("logout")}
        />
      </div>

      {isInviteModalOpen && (
        <InviteModal
          isOpen={isInviteModalOpen}
          onClose={() => setIsInviteModalOpen(false)}
        />
      )}
    </header>
  );
}
