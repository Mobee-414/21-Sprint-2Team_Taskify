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
type ButtonBorderLine = 'none' | 'gray';
type WidthPreset = 'default' | 'login'

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
  borderline?: ButtonBorderLine;

  widthPreset?: WidthPreset;
};

// font 사이즈
const fontSizeMap: Record<FontSize, string> = {
  sm: 'text-sm',
  md: 'text-base ',
  lg: 'text-lg',
};

// button height / padding
const buttonSizeMap: Record<ButtonSize, string> = {
  sm: 'h-[50px] px-3',
  md: 'h-[50px] px-4',
  lg: 'h-[50px] px-6',
}

// 버튼 width (반응형)
const widthPresetMap: Record<WidthPreset, string> = {
  default: 'w-full',

  login:`
    w-[351px]
    md:w-[520px]
  `,
};

// variant
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
const borderMap: Record<ButtonBorderLine, string> = {
  none: 'border-none',
  gray: 'border border-[var(--color-gray-base)]',
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
  widthPreset = 'login',

  ...rest
  }: BaseButtonProps) {
   
  return (
    <button
      type = {type}
      disabled = {disabled}
      onClick = {onClick}
      className = {clsx(
        'flex items-center justify-center gap-[10px]' ,
        'rounded-[8px]',
        disabled && 'cursor-not-allowed',

        buttonSizeMap[buttonSize],
        fontSizeMap[fontSize],
        variantMap[variant],
        borderMap[borderline],
        widthPresetMap[widthPreset],

        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
};