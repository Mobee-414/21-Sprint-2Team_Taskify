"use client";

import Image from "next/image";
import InvitedDashboardsEmpty from "./InvitedDashboardsEmpty";
import ButtonAcceptReject from "@/components/common/Button/ButtonAcceptReject";
import Tooltip from "@/components/common/Tooltip";
import { useScrollFade } from "@/hooks/useScrollFade";
import { useInvitedDashboards } from "@/hooks/useInvitedDashboards";
import "@/styles/utility.module.css";

export default function InvitedDashboardsSection({
  onAccepted,
}: {
  onAccepted: () => void;
}) {
  const {
    query,
    setQuery,
    items,
    loadingMore,
    isSearching,
    isEmpty,
    listScrollRef,
    sentinelRef,
    accept,
    decline,
  } = useInvitedDashboards({ onAccepted });

  const { isScrolling, onScroll } = useScrollFade(1000);

  return (
    <section
      className="
        rounded-[8px] bg-white
        w-[260px] h-[770px] px-[16px] py-[24px]
        tablet:w-[504px] tablet:h-[592px] tablet:px-[20px] tablet:py-[28px]
        desktop:w-[1022px] desktop:h-[650px] desktop:px-[28px] desktop:py-[32px]
      "
    >
      <h2 className="text-2xl font-bold text-black-medium">초대받은 대시보드</h2>

      {!isSearching && isEmpty ? (
        <div className="h-[calc(100%-56px)] flex items-center justify-center">
          <InvitedDashboardsEmpty message="아직 초대받은 대시보드가 없어요" />
        </div>
      ) : (
        <>
          <div className="mt-[24px] tablet:mt-[28px] desktop:mt-[32px]">
            <div className="relative w-full">
              <span className="pointer-events-none absolute left-[14px] top-1/2 -translate-y-1/2">
                <Image src="/icons/search.svg" alt="검색" width={24} height={24} />
              </span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="검색"
                className="
                  h-[40px] w-full rounded-[6px]
                  border border-gray-base
                  pl-[44px]
                  text-lg font-regular text-black-medium
                  placeholder:text-gray-medium
                  outline-none focus:border-violet-main
                "
              />
            </div>
          </div>

          {isSearching && isEmpty ? (
            <div className="mt-[24px] tablet:mt-[28px] desktop:mt-[24px]">
              <InvitedDashboardsEmpty message="검색 결과가 없습니다" />
            </div>
          ) : (
            <div className="mt-[24px]">
              <div
                className="
                  hidden tablet:grid
                  tablet:grid-cols-3
                  desktop:grid-cols-[280px_280px_280px]
                  items-center
                "
              >
                <div className="pl-[24px] desktop:pl-[48px] text-lg font-regular text-gray-medium">
                  이름
                </div>
                <div className="text-center text-lg font-regular text-gray-medium">
                  초대자
                </div>
                <div className="text-center text-lg font-regular text-gray-medium">
                  수락 여부
                </div>
              </div>

              <div
                ref={listScrollRef}
                onScroll={onScroll}
                className={[
                  "mt-[12px]",
                  "overflow-y-auto",
                  "pr-0",
                  "scrollbar-gutter-stable",
                  "tablet:pr-[6px]",
                  "desktop:pr-[6px]",
                  "tablet:[scrollbar-gutter:auto]",
                  "sidebar-scroll",
                  isScrolling ? "is-scrolling" : "",
                  "max-h-[610px]",
                  "tablet:max-h-[360px]",
                  "desktop:max-h-[420px]",
                ].join(" ")}
              >
                <div className="tablet:hidden">
                  {items.map((inv) => (
                    <div key={inv.id} className="border-t border-gray-light py-[14px]">
                      <div className="grid grid-cols-[56px_1fr] gap-y-[10px]">
                        <div className="text-md font-regular text-gray-medium">이름</div>
                        <Tooltip content={inv.dashboard.title} placement="bottom" onlyWhenTruncated>
                          <div className="min-w-0 truncate text-md font-regular text-black-medium">
                            {inv.dashboard.title}
                          </div>
                        </Tooltip>

                        <div className="text-md font-regular text-gray-medium">초대자</div>
                        <div className="text-md font-regular text-black-medium">
                          {inv.inviter.nickname}
                        </div>
                      </div>

                      <div className="mt-[12px] flex items-center gap-[10px] flex-nowrap">
                        <ButtonAcceptReject
                          onClick={() => accept(inv.id)}
                          variant="primary"
                          borderline="none"
                          className="h-[32px] w-[109px] text-md font-medium"
                        >
                          수락
                        </ButtonAcceptReject>

                        <ButtonAcceptReject
                          onClick={() => decline(inv.id)}
                          variant="secondary"
                          borderline="gray"
                          className="h-[32px] w-[109px] text-md font-medium"
                        >
                          거절
                        </ButtonAcceptReject>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="hidden tablet:block">
                  {items.map((inv) => (
                    <div
                      key={inv.id}
                      className="
                        grid items-center border-t border-gray-light
                        h-[60px]
                        tablet:grid-cols-3
                        desktop:grid-cols-[280px_280px_280px]
                      "
                    >
                      <div className="min-w-0 pl-[24px] pr-[12px] desktop:pl-[48px] desktop:pr-[16px]">
                        <Tooltip content={inv.dashboard.title} placement="right" onlyWhenTruncated>
                          <div className="truncate text-lg font-regular text-black-medium">
                            {inv.dashboard.title}
                          </div>
                        </Tooltip>
                      </div>

                      <div className="text-center text-lg font-regular text-black-medium">
                        {inv.inviter.nickname}
                      </div>

                      <div className="flex items-center justify-center">
                        <div className="flex w-[164px] items-center justify-center gap-[8px] desktop:w-[178px] desktop:gap-[10px]">
                          <ButtonAcceptReject
                            onClick={() => accept(inv.id)}
                            variant="primary"
                            borderline="none"
                            className="h-[32px] w-[74px] desktop:w-[84px] text-md font-medium"
                          >
                            수락
                          </ButtonAcceptReject>

                          <ButtonAcceptReject
                            onClick={() => decline(inv.id)}
                            variant="secondary"
                            borderline="gray"
                            className="h-[32px] w-[74px] desktop:w-[84px] text-md font-medium"
                          >
                            거절
                          </ButtonAcceptReject>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div ref={sentinelRef} className="h-[10px]" />

                {loadingMore && (
                  <div className="py-[10px] text-center text-xs text-gray-medium">
                    더 불러오는 중...
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
}
