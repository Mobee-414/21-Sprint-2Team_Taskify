import { useEffect } from "react";

export const useOutsideClick = (
  ref: React.RefObject<HTMLElement | null>,
  handler: () => void
) => {
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (!ref.current) return;

      if (ref.current.contains(e.target as Node)) return;

      handler();
    };

    document.addEventListener("mousedown", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, handler]);
};
