"use client";

import { useRef } from "react";
import Image from "next/image";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import type { Invitation } from "@/types/invitation.type";

type Props = {
  invites: Invitation[];
  loading: boolean;
  hasNext: boolean;
  onLoadMore: () => void;
  onOpenInvite: () => void;
  onCancel: (invitationId: number) => void;
};

export default function InvitationsSection({
  invites,
  loading,
  hasNext,
  onLoadMore,
  onOpenInvite,
  onCancel,
}: Props) {
  const enabled = hasNext && !loading && invites.length >= 5;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const endRef = useInfiniteScroll(onLoadMore, enabled, containerRef);

  return (
    <section
      className="
        mt-[16px]
        h-[406px] w-[284px]
        rounded-[12px] bg-white
        px-[12px] py-[10px]
        tablet:h-[477px] tablet:w-[544px] tablet:px-[20px] tablet:py-[19px]
        desktop:h-[404px] desktop:w-[620px] desktop:px-[28px] desktop:py-[32px]
        flex flex-col
      "
    >
      <div className="flex items-center justify-between">
        <h2 className="text-[20px] font-bold text-black-medium tablet:text-xl">
          초대 내역
        </h2>

        <button
          type="button"
          onClick={onOpenInvite}
          className="
            inline-flex shrink-0 items-center justify-center gap-[4px]
            h-[26px] w-[86px]
            rounded-[6px]
            bg-violet-main
            text-[10px] leading-none font-medium text-white
            hover:opacity-90
            tablet:h-[32px] tablet:w-[105px] tablet:gap-[6px] tablet:rounded-[8px] tablet:text-md
          "
        >
          <Image
            src="/icons/white_add_box.svg"
            alt="초대"
            width={14}
            height={14}
            className="tablet:w-[16px] tablet:h-[16px]"
          />
          초대하기
        </button>
      </div>

      <div className="mt-4 text-[14px] font-regular text-gray-medium tablet:text-lg">
        이메일
      </div>

      <div
        ref={containerRef}
        className="mt-3 flex-1 overflow-y-auto sidebar-scroll scrollbar-gutter-stable"
      >
        {loading && invites.length === 0 ? (
          <div className="py-[16px] text-[14px] font-regular text-gray-dark tablet:text-md">
            불러오는 중...
          </div>
        ) : invites.length === 0 ? (
          <div className="py-[16px] text-[14px] font-regular text-gray-dark tablet:text-md">
            초대 내역이 없습니다.
          </div>
        ) : (
          invites.map((inv) => (
            <div
              key={inv.id}
              className="flex items-center justify-between border-b border-gray-light py-[12px]"
            >
              <p className="min-w-0 truncate text-[14px] font-regular text-black-medium tablet:text-lg">
                {inv.invitee.email}
              </p>

              <button
                type="button"
                onClick={() => onCancel(inv.id)}
                className="
                  rounded-[6px]
                  bg-white
                  text-violet-main
                  border border-gray-base
                  hover:bg-gray-surface
                  h-[32px] w-[52px] text-[12px]
                  tablet:w-[84px] tablet:text-md
                  desktop:w-[84px] desktop:text-md
                "
              >
                취소
              </button>
            </div>
          ))
        )}

        {enabled && <div ref={endRef} className="h-[1px]" />}
      </div>
    </section>
  );
}
