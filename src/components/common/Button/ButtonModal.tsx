"use client";

import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from "react";
import clsx from "clsx";

type ButtonVariant = "primary" | "secondary";
type FontSize = "sm" | "md" | "lg";

interface BaseButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "type" | "disabled" | "onClick"
> {
  children?: ReactNode;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  className?: string;
  loading?: boolean;
  variant?: ButtonVariant;
  fontSize?: FontSize;
}

// 버튼 타입
const variantMap: Record<ButtonVariant, string> = {
  primary: "font-semibold text-white bg-violet-main hover:bg-purple-deep",
  secondary:
    "font-medium text-gray-dark bg-white hover:bg-gray-bg border border-gray-base",
};

// 폰트 사이즈
const fontSizeMap: Record<FontSize, string> = {
  sm: "text-sm",
  md: "text-md",
  lg: "text-lg",
};

export default function ButtonModal({
  children,
  disabled,
  onClick,
  type = "button",
  className,
  variant = "primary",
  fontSize = "md",
  ...rest
}: BaseButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        "flex items-center justify-center gap-[10px]",
        "rounded-[8px]",
        (disabled || className?.includes("disabled")) &&
          "!bg-gray-base !text-white opacity-70",
        variantMap[variant],
        fontSizeMap[fontSize],
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
