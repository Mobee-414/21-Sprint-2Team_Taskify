'use client';

import type {
  ButtonHTMLAttributes,
  MouseEventHandler,
  ReactNode,
} from 'react';
import clsx from 'clsx';

type ButtonVariant = 'primary' | 'secondary';
type ButtonBorderLine = 'none' | 'gray';

interface BaseButtonProps
  extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'type' | 'disabled' | 'onClick'
  > {
  children?: ReactNode;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  loading?: boolean;

  variant?: ButtonVariant;
  borderline?: ButtonBorderLine;
}

const variantMap: Record<ButtonVariant, string> = {
  primary: `
    bg-[var(--color-violet-main)]
    text-[var(--color-white)]
    font-[var(--font-weight-medium)]
    hover:bg-[var(--color-purple-deep)]
    disabled:bg-[var(--color-gray-base)]
  `,
  secondary: `
    bg-[var(--color-white)]
    hover:bg-[var(--color-gray-bg)]
    text-[color:var(--color-violet-main)]
  `,
};

const borderMap: Record<ButtonBorderLine, string> = {
  none: 'border-none',
  gray: 'border border-[var(--color-gray-base)]',
};

export default function ButtonAcceptReject({
  children,
  disabled,
  onClick,
  type = 'button',
  className,
  variant = 'primary',
  borderline = 'gray',
  ...rest
}: BaseButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        'flex items-center justify-center',
        'rounded-[4px]',
        disabled && 'cursor-not-allowed',

        // 기본 (Mobile)
        'h-[32px] w-[74px]',
        'text-md',

        // Desktop
        'desktop:w-[84px] desktop:text-lg',

        variantMap[variant],
        borderMap[borderline],
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
