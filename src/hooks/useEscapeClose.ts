import { useEffect } from "react";

export const useEscapeClose = (handler: () => void) => {
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === "Escape") handler();
    };

    document.addEventListener("keydown", listener);
    return () => document.removeEventListener("keydown", listener);
  }, [handler]);
};
