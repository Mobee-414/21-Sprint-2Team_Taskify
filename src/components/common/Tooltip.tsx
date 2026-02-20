import { ReactNode, useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

type TooltipProps = {
  content: string;
  children: ReactNode;
  placement?: "right" | "top" | "bottom";
  maxWidth?: number;
  onlyWhenTruncated?: boolean;
};

export default function Tooltip({
  content,
  children,
  placement = "right",
  maxWidth = 360,
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

  const updatePosition = useCallback(() => {
    const el = targetRef.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    const gap = 10;

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
  }, [placement]);

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

    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [open, updatePosition]);

  const longPressTimer = useRef<number | null>(null);

  const onTouchStart = () => {
    if (longPressTimer.current) window.clearTimeout(longPressTimer.current);
    longPressTimer.current = window.setTimeout(() => show(), 450);
  };

  const onTouchEnd = () => {
    if (longPressTimer.current) window.clearTimeout(longPressTimer.current);
    longPressTimer.current = null;
    hide();
  };

  const baseTransform =
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
              className="
                fixed z-[9999]
                rounded-[12px]
                border border-violet-main/15
                bg-white
                px-3.5 py-2.5
                text-[12px] leading-[16px]
                text-black-medium
                shadow-[0_14px_40px_rgba(17,24,39,0.14)]
                pointer-events-none
                break-words
                opacity-0
                animate-[tooltipIn_200ms_cubic-bezier(0.2,0.8,0.2,1)_forwards]
              "
              style={{
                top: pos.top,
                left: pos.left,
                transform: `${baseTransform} scale(0.98)`,
                maxWidth,
              }}
            >
              <style>{`@keyframes tooltipIn{to{opacity:1;transform:${baseTransform} scale(1)}}`}</style>

              <div className="font-medium">{content}</div>

              <div
                className="absolute h-2.5 w-2.5 rotate-45 bg-white border border-violet-main/15"
                style={
                  placement === "right"
                    ? { left: -6, top: "50%", transform: "translateY(-50%) rotate(45deg)" }
                    : placement === "top"
                    ? { left: "50%", bottom: -6, transform: "translateX(-50%) rotate(45deg)" }
                    : { left: "50%", top: -6, transform: "translateX(-50%) rotate(45deg)" }
                }
              />
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
