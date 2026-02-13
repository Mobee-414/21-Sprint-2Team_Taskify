import { useEffect, useRef, useState } from "react";

export function useScrollFade(timeoutMs = 1000) {
  const [isScrolling, setIsScrolling] = useState(false);
  const timerRef = useRef<number | null>(null);

  const onScroll = () => {
    setIsScrolling(true);
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setIsScrolling(false), timeoutMs);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  return { isScrolling, onScroll };
}
