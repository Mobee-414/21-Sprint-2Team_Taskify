"use client";

import Image from "next/image";
import ProfileDropdown from "@/components/dropdown/feature/Profile";
import InviteModal from "@/components/modals/InviteModal";
import Tooltip from "@/components/common/Tooltip";
import { useState } from "react";
import { Member } from "@/hooks/useDashboardMembers";

interface HeaderProps {
  title: string;
  isOwner?: boolean;
  members: Member[];
  totalCount: number;
  onEditClick?: () => void;
}

export default function Header({ title, isOwner, onEditClick }: HeaderProps) {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  return (
    <>
      <header
        className="
          flex h-[70px]
          items-center
          justify-between
          border-b border-gray-base
          bg-white
          hidden tablet:flex
          tablet:pl-[40px] tablet:pr-[32px]
          desktop:pr-[80px]
        "
      >
        <div className="flex min-w-0 flex-1 items-center">
          <Tooltip content={title} placement="bottom" onlyWhenTruncated>
            <h1
              className="
                text-[20px] font-bold text-[#333236]
                truncate
                max-w-[220px]
                tablet:max-w-[360px]
                desktop:max-w-[520px]
              "
            >
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

        <div className="flex shrink-0 items-center">
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
                <Image src="/icons/settings.svg" alt="관리" width={20} height={20} />
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

          <div className="w-[36px]" />
          <div className="h-[40px] w-px bg-gray-base" />
          <div className="w-[36px]" />

          <ProfileDropdown onLogout={() => console.log("logout")} />
        </div>
      </header>

      <header
        className="
          flex h-[70px]
          items-center
          justify-between
          border-b border-gray-base
          bg-white
          px-4
          tablet:hidden
        "
      >
        <div className="flex min-w-0 flex-1 items-center">
          <Tooltip content={title} placement="bottom" onlyWhenTruncated>
            <h1 className="text-[16px] font-bold text-black-medium truncate max-w-[200px]">
              {title}
            </h1>
          </Tooltip>

          {isOwner && (
            <Image
              src="/icons/crown.svg"
              alt="소유자"
              width={18}
              height={14}
              className="ml-2 shrink-0"
            />
          )}
        </div>

        <div className="flex shrink-0 items-center flex-nowrap">
          {isOwner && (
            <button
              type="button"
              onClick={onEditClick}
              className="
                flex items-center justify-center
                w-[36px] h-[36px]
                rounded-md border border-gray-base
                hover:bg-gray-surface cursor-pointer
                shrink-0
              "
              aria-label="관리"
              title="관리"
            >
              <Image src="/icons/settings.svg" alt="관리" width={18} height={18} />
            </button>
          )}

          <div className="w-[8px]" />

          <button
            type="button"
            onClick={() => setIsInviteModalOpen(true)}
            className="
              flex items-center justify-center
              w-[36px] h-[36px]
              rounded-md border border-gray-base
              hover:bg-gray-surface cursor-pointer
              shrink-0
            "
            aria-label="초대하기"
            title="초대하기"
          >
            <Image src="/icons/add_box.svg" alt="초대하기" width={18} height={18} />
          </button>

          <div className="w-[12px]" />
          <div className="h-[30px] w-px bg-gray-base shrink-0" />
          <div className="w-[12px]" />

          <ProfileDropdown onLogout={() => console.log("logout")} />
        </div>
      </header>

      {isInviteModalOpen && (
        <InviteModal
          isOpen={isInviteModalOpen}
          onClose={() => setIsInviteModalOpen(false)}
        />
      )}
    </>
  );
}
