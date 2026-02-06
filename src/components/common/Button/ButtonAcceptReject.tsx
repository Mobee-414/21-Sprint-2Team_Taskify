'use client';

import type {
  ButtonHTMLAttributes,
  MouseEventHandler,
  ReactNode,
} from 'react';
import clsx from 'clsx';

type ButtonVariant = 'primary' | 'secondary';
type ButtonBorderLine = 'none' | 'gray';

interface BaseButtonProps extends Omit <
    ButtonHTMLAttributes<HTMLButtonElement>,
    'type' | 'disabled' | 'onClick'
  >
{
  children?: ReactNode;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  loading?: boolean;

  variant?: ButtonVariant;
  borderline?: ButtonBorderLine;
};


// 버튼
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

// 테두리
const borderMap: Record<ButtonBorderLine, string> = {
  none: 'border-none',
  gray: 'border border-[var(--color-gray-base)]',
};

export default function BaseButton({
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
        'flex items-center justify-center gap-[10px]',
        'rounded-[4px]',
        disabled && 'cursor-not-allowed',

        // PC
        'lg:w-[84px] lg:h-[32px]',
        'lg:text-[length:var(--font-size-md)] lg:leading-[var(--line-height-md)]',
        // Tablet
        'md:w-[72px] md:h-[30px]',
        'md:text-[length:var(--font-size-md)] md:leading-[var(--line-height-md)]',
        // Mobile
        'w-[109px] h-[32px]',
        'text-[length:var(--font-size-xs-tight)] leading-[var(--line-height-xs-tight)]',
        
        variantMap[variant],
        borderMap[borderline],

        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}