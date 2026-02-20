"use client";

import { Member } from "@/hooks/useDashboardMembers";
import BaseModal from "../common/BaseModal";
import Avatar from "../common/Avatar";
import Image from "next/image";

interface MemberListModalProps {
  isOpen: boolean;
  onClose: () => void;
  members: Member[];
}

export default function MemberListModal({
  isOpen,
  onClose,
  members,
}: MemberListModalProps) {
  const sortedMembers = [...members].sort((a, b) => {
    if (a.isOwner === b.isOwner) return 0;
    return a.isOwner ? -1 : 1;
  });
  if (!isOpen) return null;
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} width={520}>
      <div className="w-[327px] tablet:w-[568px] mx-auto px-5 tablet:px-8 py-6 tablet:py-8">
        <div className="flex flex-col">
          <div className="flex items-center justify-between pb-4 border-b border-gray-light">
            <h2 className="text-xl font-bold text-black-medium">멤버 목록</h2>
          </div>

          <div className="flex flex-col gap-4 max-h-[420px] overflow-y-auto">
            {sortedMembers.map((member, index) => (
              <div
                key={member.id}
                className="flex items-center justify-between py-4 px-2 rounded-lg hover:bg-gray-bg transition-colors"
              >
                <div className="flex items-center gap-4">
                  <Avatar
                    nickname={member.nickname}
                    imageUrl={member.profileImageUrl}
                    className="w-[38px] h-[38px]"
                  />

                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-black-medium">
                        {member.nickname}
                      </span>

                      {member.isOwner && (
                        <Image
                          src="/icons/crown.svg"
                          alt="소유자"
                          width={18}
                          height={16}
                        />
                      )}
                    </div>

                    <span className="text-sm text-gray-medium">
                      {member.email}
                    </span>
                  </div>
                </div>
                {index !== sortedMembers.length - 1 && (
                  <div className="h-px bg-gray-light mx-2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </BaseModal>
  );
}
