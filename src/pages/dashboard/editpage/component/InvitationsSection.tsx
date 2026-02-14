"use client";

import Image from "next/image";
import type { Invitation } from "@/types/invitation.type";

type Props = {
  invites: Invitation[];
  loading: boolean;
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
  onOpenInvite: () => void;
  onCancel: (invitationId: number) => void;
};

export default function InvitationsSection({
  invites,
  loading,
  page,
  totalPages,
  onPrev,
  onNext,
  onOpenInvite,
  onCancel,
}: Props) {
  return (
    <section className="mt-[16px] h-[477px] w-[620px] rounded-[12px] bg-white px-[28px] py-[32px]">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-black-medium">
          초대 내역
        </h3>

        <div className="flex items-center gap-[16px]">
          <span className="text-md font-regular text-black-medium">
            {page} 페이지 중 {totalPages}
          </span>

          <div className="flex h-[40px] w-[80px] overflow-hidden">
            <button
              type="button"
              onClick={onPrev}
              disabled={page <= 1}
              className="flex h-[40px] w-[40px] items-center justify-center rounded-l-[4px] bg-white disabled:opacity-50"
              aria-label="이전"
            >
              <Image
                src="/icons/pagination_left.svg"
                alt="이전"
                width={16}
                height={16}
              />
            </button>

            <button
              type="button"
              onClick={onNext}
              disabled={page >= totalPages}
              className="flex h-[40px] w-[40px] items-center justify-center rounded-r-[4px] bg-white disabled:opacity-50"
              aria-label="다음"
            >
              <Image
                src="/icons/pagination_right.svg"
                alt="다음"
                width={16}
                height={16}
              />
            </button>
          </div>

          <button
            type="button"
            onClick={onOpenInvite}
            className="
              flex h-[32px] w-[105px] items-center justify-center gap-[6px]
              rounded-[8px]
              bg-violet-main
              text-md font-medium text-white
              hover:opacity-90
            "
          >
            <Image
              src="/icons/white_add_box.svg"
              alt="초대하기"
              width={16}
              height={16}
            />
            초대하기
          </button>
        </div>
      </div>

      <div className="mt-[32px]">
        <div className="text-lg font-regular text-gray-medium">
          이메일
        </div>

        <div className="mt-[17px] flex flex-col">
          {loading ? (
            <div className="py-[16px] text-md font-regular text-gray-dark">
              불러오는 중...
            </div>
          ) : invites.length === 0 ? (
            <div className="py-[16px] text-md font-regular text-gray-dark">
              초대 내역이 없습니다.
            </div>
          ) : (
            invites.map((inv) => (
              <div
                key={inv.id}
                className="flex items-center justify-between border-b border-gray-light py-[12px]"
              >
                <div className="text-lg font-regular text-black-medium">
                  {inv.invitee.email}
                </div>

                <div className="mr-[28px]">
                  <button
                    type="button"
                    onClick={() => onCancel(inv.id)}
                    className="
                      h-[32px] w-[84px]
                      rounded-[6px]
                      bg-white
                      text-md font-medium text-violet-main
                      hover:bg-gray-surface
                    "
                  >
                    취소
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
