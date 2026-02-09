import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import useDebounce from "@/hooks/useDebounce";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import {
  getReceivedInvitations,
  respondInvitation,
  type Invitation,
} from "@/api/invitations.api";
import InvitedDashboardsEmpty from "./InvitedDashboardsEmpty";
import ButtonAcceptReject from "@/components/common/Button/ButtonAcceptReject";

const SIZE = 10;

export default function InvitedDashboardsSection({
  onAccepted,
}: {
  onAccepted: () => void;
}) {
  const [query, setQuery] = useState("");
  const debounced = useDebounce(query, 300);

  const [items, setItems] = useState<Invitation[]>([]);
  const [cursorId, setCursorId] = useState<number | null>(null);
  const [hasNext, setHasNext] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const listScrollRef = useRef<HTMLDivElement | null>(null);

  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimer = useRef<number | null>(null);

  const handleListScroll = () => {
    setIsScrolling(true);
    if (scrollTimer.current) window.clearTimeout(scrollTimer.current);
    scrollTimer.current = window.setTimeout(() => {
      setIsScrolling(false);
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (scrollTimer.current) window.clearTimeout(scrollTimer.current);
    };
  }, []);

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      try {
        const data = await getReceivedInvitations({
          size: SIZE,
          cursorId: null,
          title: debounced,
        });
        if (!alive) return;

        setItems(data.invitations);
        setCursorId(data.cursorId);
        setHasNext(Boolean(data.cursorId) && data.invitations.length > 0);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [debounced]);

  const loadMore = useCallback(async () => {
    if (!hasNext || loadingMore) return;

    setLoadingMore(true);
    try {
      const data = await getReceivedInvitations({
        size: SIZE,
        cursorId,
        title: debounced,
      });

      setItems((prev) => [...prev, ...data.invitations]);
      setCursorId(data.cursorId);
      setHasNext(Boolean(data.cursorId) && data.invitations.length > 0);
    } finally {
      setLoadingMore(false);
    }
  }, [hasNext, loadingMore, cursorId, debounced]);

  const sentinelRef = useInfiniteScroll(
    loadMore,
    hasNext && !loadingMore,
    listScrollRef
  );

  const empty = useMemo(() => !loading && items.length === 0, [loading, items]);

  const accept = async (invitationId: number) => {
    await respondInvitation({ invitationId, inviteAccepted: true });
    setItems((prev) => prev.filter((x) => x.id !== invitationId));
    onAccepted();
  };

  const decline = async (invitationId: number) => {
    await respondInvitation({ invitationId, inviteAccepted: false });
    setItems((prev) => prev.filter((x) => x.id !== invitationId));
  };

  if (!loading && empty) {
    return (
      <div className="mt-[74px]">
        <InvitedDashboardsEmpty />
      </div>
    );
  }

  return (
    <section
      className="
        w-[1022px] h-[650px]
        rounded-[8px] bg-white
        px-[28px] py-[32px]
      "
    >
      <h2 className="text-[24px] font-bold text-[#333236]">
        초대받은 대시보드
      </h2>

      <div className="mt-[32px]">
        <div className="relative w-[966px]">
          <span className="pointer-events-none absolute left-[14px] top-1/2 -translate-y-1/2">
            <Image src="/icons/search.svg" alt="검색" width={24} height={24} />
          </span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="검색"
            className="
              h-[40px] w-[966px]
              rounded-[6px] border border-gray-base
              pl-[44px]
              text-[16px] font-normal text-[#333236]
              placeholder:text-[#9FA6B2]
              outline-none
              focus:border-violet-main
            "
          />
        </div>
      </div>

      <div className="mt-[24px]">
        <div className="grid grid-cols-[280px_280px_280px] items-center">
          <div className="pl-[76px] text-[16px] font-normal text-[#9FA6B2]">
            이름
          </div>
          <div className="text-center text-[16px] font-normal text-[#9FA6B2]">
            초대자
          </div>
          <div className="text-center text-[16px] font-normal text-[#9FA6B2]">
            수락 여부
          </div>
        </div>

        <div
          ref={listScrollRef}
          onScroll={handleListScroll}
          className={[
            "mt-[12px]",
            "max-h-[420px]",
            "overflow-y-auto",
            "pr-[6px]",
            "sidebar-scroll",
            isScrolling ? "is-scrolling" : "",
          ].join(" ")}
        >
          {items.map((inv) => (
            <div
              key={inv.id}
              className="
                grid grid-cols-[280px_280px_280px]
                items-center
                border-t border-gray-light
                h-[60px]
              "
            >
              <div className="min-w-0 pl-[76px] pr-[16px]">
                <div className="truncate text-[16px] font-normal text-[#333236]">
                  {inv.dashboard.title}
                </div>
              </div>

              <div className="text-center text-[16px] font-normal text-[#333236]">
                {inv.inviter.nickname}
              </div>

              <div className="flex items-center justify-center">
                <div className="flex w-[178px] items-center justify-center gap-[10px]">
                  <ButtonAcceptReject
                    type="button"
                    onClick={() => accept(inv.id)}
                    variant="primary"
                    borderline="none"
                    className="h-[32px] w-[84px] text-[14px] font-medium"
                  >
                    수락
                  </ButtonAcceptReject>

                  <ButtonAcceptReject
                    type="button"
                    onClick={() => decline(inv.id)}
                    variant="secondary"
                    borderline="gray"
                    className="h-[32px] w-[84px] text-[14px] font-medium"
                  >
                    거절
                  </ButtonAcceptReject>
                </div>
              </div>
            </div>
          ))}

          <div ref={sentinelRef} className="h-[10px]" />

          {loadingMore && (
            <div className="py-[10px] text-center text-[12px] text-[#9FA6B2]">
              더 불러오는 중...
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
