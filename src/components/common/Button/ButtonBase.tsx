'use client';

import type {
  ButtonHTMLAttributes,
  MouseEventHandler,
  ReactNode,
} from 'react';
import clsx from 'clsx';

type FontSize = 'sm' | 'md' | 'lg';
type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonVariant = 'primary' | 'secondary';
type ButtonBorderline = 'none' | 'grey';
type ButtonAcceptSize= 'desktop' | 'tablet' | 'mobile';

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

  buttonSize?: ButtonSize;
  fontSize?: FontSize;
  variant?: ButtonVariant;
  borderline?: ButtonBorderline;
  acceptSize?: ButtonAcceptSize;
};

// font 사이즈
const acceptFontSizeMap: Record<ButtonAcceptSize, string> = {
  desktop: `
    text-[length:var(--font-size-md)]
    leading-[var(--line-height-md)]
  `,
  tablet: `
    text-[length:var(--font-size-md)]
    leading-[var(--line-height-md)]
  `,
  mobile: `
    text-[length:var(--font-size-xs-tight)]
    leading-[var(--line-height-xs-tight)]
  `,
};

// 버튼 width
const acceptButtonSizeMap: Record<ButtonAcceptSize, string> = {
  desktop: 'w-[84px] h-[32px] gap-[10px] ',
  tablet: 'w-[72px] h-[30px] gap-[10px] ',
  mobile: 'w-[109px] h-[32px] gap-[10px] ',
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
    bg-[var(--color-gray-base)]
    text-[color:var(--color-violet-main)]
  `,
};

// 테두리
const borderMap: Record<ButtonBorderline, string> = {
  none: 'border-none',
  grey: 'border border-[var(--color-gray-base)]',
};

export default function BaseButton({
  children,
  disabled,
  onClick,
  type = 'button',
  className,

  variant = 'primary',
  borderline = 'grey',
  acceptSize = 'desktop',
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

        acceptButtonSizeMap[acceptSize],
        acceptFontSizeMap[acceptSize],
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