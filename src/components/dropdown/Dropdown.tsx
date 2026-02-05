import React, { useCallback, useRef, useState } from "react";
import { DropdownContext, useDropdown } from "./DropdownContext";
import { useOutsideClick } from "./useOutsideClick";
import { useEscapeClose } from "./useEscapeClose";

type Props = {
  children: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
};

export function Dropdown({ children, onOpenChange }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    onOpenChange?.(false);
  }, [onOpenChange]);

  const toggle = useCallback(() => {
    setOpen((prev) => {
      onOpenChange?.(!prev);
      return !prev;
    });
  }, [onOpenChange]);

  useOutsideClick(ref, close);
  useEscapeClose(close);

  return (
    <DropdownContext.Provider value={{ open, toggle, close }}>
      <div ref={ref} className="relative inline-block">
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

export function DropdownTrigger({ children }: { children: React.ReactNode }) {
  const { toggle } = useDropdown();
  return <div onClick={toggle}>{children}</div>;
}

export function DropdownMenu({
  children,
  className = "",
  align = "start",
}: {
  children: React.ReactNode;
  className?: string;
  align?: "start" | "end";
}) {
  const { open } = useDropdown();
  if (!open) return null;

  return (
    <div
      className={`
        absolute top-full mt-[2px] z-50
        ${align === "start" ? "left-0" : "right-0"}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export function DropdownItem({
  children,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  const { close } = useDropdown();

  const handleClick = () => {
    onClick?.();
    close();
  };

  return (
    <div
      onClick={handleClick}
      className={`cursor-pointer select-none ${className}`}
    >
      {children}
    </div>
  );
}
