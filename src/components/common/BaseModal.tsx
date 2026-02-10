"use client";

import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  width?: number;
  radius?: keyof typeof RADIUS_VARIANTS;
  padding?: keyof typeof PADDING_VARIANTS;
  gap?: keyof typeof GAP_VARIANTS;
}

const RADIUS_VARIANTS = {
  sm: "rounded-lg", // 8px
  md: "rounded-2xl", // 16px
};

const PADDING_VARIANTS = {
  md: "p-6", // 24px
  lg: "p-8", // 32px
};

const GAP_VARIANTS = {
  sm: "gap-[10px]",
  md: "gap-[14px]",
  lg: "gap-8", // 32px
};

export default function BaseModal({
  isOpen,
  onClose,
  children,
  width,
  radius = "md",
  padding = "lg",
  gap = "md",
}: BaseModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    // 스크롤 방지
    document.body.style.overflow = "hidden";

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-999 flex items-center justify-center bg-black/60"
      onClick={onClose}
    >
      <div
        className={`
          relative
          flex flex-col
          bg-[#FFFFFF]
          ${RADIUS_VARIANTS[radius]}
          ${PADDING_VARIANTS[padding]}
          ${GAP_VARIANTS[gap]}
          max-h-[90vh]
          overflow-hidden
        `}
        style={{ width: width ? `${width}px` : "auto" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`
          flex w-full flex-col items-center
          overflow-y-auto
          ${GAP_VARIANTS[gap]}
        `}
        >
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
