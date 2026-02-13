"use client";

import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from "react";
import clsx from "clsx";

type ButtonVariant = "primary" | "secondary";

interface BaseButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "type" | "disabled" | "onClick"
> {
  children?: ReactNode;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  variant?: ButtonVariant;
  className?: string;
  loading?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

// 버튼 타입 정의
const variantMap: Record<ButtonVariant, string> = {
  primary: `
    bg-violet-main
    text-white
    font-medium
    hover:bg-purple-deep
    disabled:bg-gray-base
  `,
  secondary: `
    bg-white
    hover:bg-gray-bg
    text-violet-main
  `,
};

export default function ButtonInputDelete({
  children,
  disabled,
  type = "button",
  variant = "primary",
  className,
  onClick,
  ...rest
}: BaseButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        "flex items-center justify-center",
        "rounded-[4px] border border-gray-base",
        variantMap[variant],
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
