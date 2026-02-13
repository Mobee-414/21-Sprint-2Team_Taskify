import { ReactNode, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

type TooltipProps = {
  content: string;
  children: ReactNode;
  placement?: "right" | "top" | "bottom" ;
  maxWidth?: number;
  onlyWhenTruncated?: boolean;
};

export default function Tooltip({
  content,
  children,
  placement = "right",
  maxWidth = 260,
  onlyWhenTruncated = true,
}: TooltipProps) {
  const tooltipId = useId();

  const wrapperRef = useRef<HTMLSpanElement | null>(null);
  const targetRef = useRef<HTMLElement | null>(null);

  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  const resolveTarget = () => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const first = wrapper.firstElementChild as HTMLElement | null;
    targetRef.current = first ?? wrapper;
  };

  const isTruncated = () => {
    const el = targetRef.current;
    if (!el) return false;
    return el.scrollWidth > el.clientWidth + 1;
  };

  const updatePosition = () => {
    const el = targetRef.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    const gap = 8;

    let top = 0;
    let left = 0;

    if (placement === "right") {
      top = r.top + r.height / 2;
      left = r.right + gap;
    } else if (placement === "top") {
      top = r.top - gap;
      left = r.left + r.width / 2;
    } else {
      top = r.bottom + gap;
      left = r.left + r.width / 2;
    }

    setPos({ top, left });
  };

  const show = () => {
    if (!content) return;

    resolveTarget();
    if (onlyWhenTruncated && !isTruncated()) return;

    setOpen(true);
    updatePosition();
  };

  const hide = () => setOpen(false);

  useEffect(() => {
    if (!open) return;

    const onScrollOrResize = () => updatePosition();
    window.addEventListener("scroll", onScrollOrResize, true);
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      window.removeEventListener("scroll", onScrollOrResize, true);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [open]);

  const longPressTimer = useRef<number | null>(null);

  const onTouchStart = () => {
    if (longPressTimer.current) window.clearTimeout(longPressTimer.current);
    longPressTimer.current = window.setTimeout(() => show(), 500);
  };

  const onTouchEnd = () => {
    if (longPressTimer.current) window.clearTimeout(longPressTimer.current);
    longPressTimer.current = null;
    hide();
  };

  const transform =
    placement === "right"
      ? "translateY(-50%)"
      : placement === "top"
      ? "translate(-50%, -100%)"
      : "translate(-50%, 0)";

  const canUseDOM = typeof window !== "undefined" && typeof document !== "undefined";

  return (
    <>
      <span
        ref={wrapperRef}
        className="inline-flex min-w-0 max-w-full shrink"
        onMouseEnter={show}
        onMouseLeave={hide}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchEnd}
        aria-describedby={open ? tooltipId : undefined}
      >
        {children}
      </span>

      {canUseDOM && open && content
        ? createPortal(
            <div
              id={tooltipId}
              role="tooltip"
              className="fixed z-[9999] rounded-md bg-gray-900 text-white px-3 py-2 text-xs shadow-lg pointer-events-none break-words"
              style={{ top: pos.top, left: pos.left, transform, maxWidth }}
            >
              {content}
            </div>,
            document.body
          )
        : null}
    </>
  );
}
