"use client";

import Image from "next/image";
import type { Member } from "@/api/members.api";

type Props = {
  members: Member[];
  loading: boolean;
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
  onDelete: (memberId: number) => void;
};

export default function MembersSection({
  members,
  loading,
  page,
  totalPages,
  onPrev,
  onNext,
  onDelete,
}: Props) {
  return (
    <section className="mt-[16px] h-[404px] w-[620px] rounded-[12px] bg-white px-[28px] py-[32px]">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-black-medium">구성원</h3>

        <div className="flex items-center">
          <span className="text-md font-regular text-black-medium">
            {page} 페이지 중 {totalPages}
          </span>

          <div className="ml-[16px] flex h-[40px] w-[80px] overflow-hidden">
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
        </div>
      </div>

      <div className="mt-[27px]">
        <div className="text-lg font-regular text-gray-medium">이름</div>

        <div className="mt-[17px] flex flex-col">
          {loading ? (
            <div className="py-[16px] text-md font-regular text-gray-dark">
              불러오는 중...
            </div>
          ) : members.length === 0 ? (
            <div className="py-[16px] text-md font-regular text-gray-dark">
              구성원이 없습니다.
            </div>
          ) : (
            members.map((m) => (
              <div
                key={m.id}
                className="flex items-center justify-between border-b border-gray-light py-[12px]"
              >
                <div className="flex items-center">
                  <div className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-gray-surface text-md font-bold text-gray-dark">
                    {m.nickname?.[0]?.toUpperCase()}
                  </div>

                  <div className="ml-[12px] text-lg font-regular text-black-medium">
                    {m.nickname}
                  </div>
                </div>

                <div className="mr-[28px]">
                  <button
                    type="button"
                    onClick={() => onDelete(m.id)}
                    className="
                      h-[32px] w-[84px]
                      rounded-[6px]
                      bg-white
                      text-md font-medium text-violet-main
                      hover:bg-gray-surface
                    "
                  >
                    삭제
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
