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
type ButtonLoginWidth= 'desktop' | 'mobile';

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

  loginWidth?: ButtonLoginWidth;
};

// font 사이즈
const fontSizeMap: Record<FontSize, string> = {
  sm: 'text-sm',
  md: 'text-base ',
  lg: 'text-lg',
};

// button height / padding
const buttonSizeMap: Record<ButtonSize, string> = {
  sm: 'h-8 px-3',
  md: 'h-10 px-4',
  lg: 'h-12 px-6',
}

// 버튼 width
const loginWidthMap: Record<ButtonLoginWidth, string> = {
  desktop: 'w-[520px]',
  mobile: 'w-[351px]',
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
    text-[var(--color-white)]
  `,
};

// 테두리
const borderMap: Record<ButtonBorderline, string> = {
  none: 'border-none',
  grey: 'border border-[var(--color-gray-base)]',
};

export default function BaseButton ( {
  children,
  disabled,
  onClick,
  type = 'button',
  className,

  buttonSize = 'md',
  fontSize= 'md',
  variant = 'primary',
  borderline = 'none',
  loginWidth = 'desktop',
  ...rest
  }: BaseButtonProps) {
   
  return (
    <button
      type = {type}
      disabled = {disabled}
      onClick = {onClick}
      className = {clsx(
        'flex items-center justify-center gap-[10px]' ,
        'h-[50px]',
        'rounded-[8px]',
        disabled && 'cursor-not-allowed',

        buttonSizeMap[buttonSize],
        fontSizeMap[fontSize],
        variantMap[variant],
        borderMap[borderline],
        loginWidthMap[loginWidth],

        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
};