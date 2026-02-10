import { useEffect, useRef } from "react";

export default function useInfiniteScroll(
  onReachEnd: () => void,
  enabled: boolean,
  rootRef?: React.RefObject<HTMLElement | null>
) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) onReachEnd();
      },
      {
        root: rootRef?.current ?? null,
        rootMargin: "200px",
        threshold: 0,
      }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [onReachEnd, enabled, rootRef]);

  return ref;
}
