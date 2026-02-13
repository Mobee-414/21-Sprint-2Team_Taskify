import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { getReceivedInvitations, respondInvitation } from "@/api/invitations.api";
import type { Invitation } from "@/types/invitation.type";
import { useIsMountedRef } from "@/hooks/useIsMountedRef";

const SIZE = 10;

export function useInvitedDashboards(params: { onAccepted: () => void }) {
  const { onAccepted } = params;

  const [query, setQuery] = useState("");
  const debounced = useDebounce(query, 300);

  const [items, setItems] = useState<Invitation[]>([]);
  const [cursorId, setCursorId] = useState<number | null>(null);
  const [hasNext, setHasNext] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const listScrollRef = useRef<HTMLDivElement | null>(null);
  const mountedRef = useIsMountedRef();

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await getReceivedInvitations({
          size: SIZE,
          cursorId: null,
          title: debounced,
        });

        if (!mountedRef.current) return;

        setItems(data.invitations);
        setCursorId(data.cursorId);
        setHasNext(Boolean(data.cursorId) && data.invitations.length > 0);
      } finally {
        if (mountedRef.current) setLoading(false);
      }
    })();
  }, [debounced, mountedRef]);

  const loadMore = useCallback(async () => {
    if (!hasNext || loadingMore) return;

    setLoadingMore(true);
    try {
      const data = await getReceivedInvitations({
        size: SIZE,
        cursorId,
        title: debounced,
      });

      if (!mountedRef.current) return;

      setItems((prev) => [...prev, ...data.invitations]);
      setCursorId(data.cursorId);
      setHasNext(Boolean(data.cursorId) && data.invitations.length > 0);
    } finally {
      if (mountedRef.current) setLoadingMore(false);
    }
  }, [hasNext, loadingMore, cursorId, debounced, mountedRef]);

  const sentinelRef = useInfiniteScroll(
    loadMore,
    hasNext && !loadingMore,
    listScrollRef
  );

  const accept = useCallback(
    async (invitationId: number) => {
      await respondInvitation({ invitationId, inviteAccepted: true });
      setItems((prev) => prev.filter((x) => x.id !== invitationId));
      onAccepted();
    },
    [onAccepted]
  );

  const decline = useCallback(async (invitationId: number) => {
    await respondInvitation({ invitationId, inviteAccepted: false });
    setItems((prev) => prev.filter((x) => x.id !== invitationId));
  }, []);

  const isSearching = useMemo(() => debounced.trim().length > 0, [debounced]);
  const isEmpty = useMemo(() => !loading && items.length === 0, [loading, items.length]);

  return {
    query,
    setQuery,
    items,
    loading,
    loadingMore,
    isSearching,
    isEmpty,
    hasNext,
    listScrollRef,
    sentinelRef,
    accept,
    decline,
  };
}
