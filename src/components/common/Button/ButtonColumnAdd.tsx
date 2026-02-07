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
    text-[color:var(--color-black-medium)]
  `,
};

// 테두리
const borderMap: Record<ButtonBorderLine, string> = {
  none: 'border-none',
  gray: 'border border-[var(--color-gray-base)]',
};

export default function ButtonColumnAdd({
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
        'flex items-center justify-center ',
        'rounded-[4px]',
        disabled && 'cursor-not-allowed',

        // desktop
        `
        lg:w-[354px] lg:h-[70px] lg:gap-[10px]
        lg:text-[length:var(--font-size-2lg)]
        lg:leading-[var(--line-height-md)]
        `,

        // tablet
        `
        md:w-[544px] md:h-[70px] md:gap-[10px]
        md:text-[length:var(--font-size-2lg)]
        md:leading-[var(--line-height-md)]
        `,
        
        //mobile
        `
        w-[284px] h-[66px] gap-[12px]
        text-[length:var(--font-size-lg)]
        leading-[var(--line-height-xs-tight)]
        font-[var(--font-weight-bold)]
        `,
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