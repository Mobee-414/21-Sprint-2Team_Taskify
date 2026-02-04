'use client';

import type {
  ButtonHTMLAttributes,
  MouseEventHandler,
  ReactNode,
} from 'react';
import clsx from 'clsx';

type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonVariant = 'primary' | 'secondary';

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
  size?: ButtonSize;
  variant?: ButtonVariant;
  radius?: 'sm' | 'md' | 'lg';
  
}

// const radiusMap = {
//   sm: 'rounded-sm',
//   md: 'rounded-md',
//   lg: 'rounded-lg',
// };

// const sizeMap = {
//   sm: 'text-sm py-2 px-4',
//   md: 'text-base py-3 px-6',
//   lg: 'text-lg py-4 px-8',
// };

// const variantMap = {
//   primary: 'bg-violet-500 text-white border-none hover:bg-violet-600 disabled:bg-gray-400',
//   secondary: 'bg-grey-500 text-white border-none hover:bg-gery-600',
// };

export default function BaseButton ( {
  children,
  disabled,
  onClick,
  type = 'button',
  // className,
  // size= 'md',
  // variant = 'primary',
  // radius = 'md',
  ...rest
  }: BaseButtonProps) {
   
  return (
    <button
      type = {type}
      disabled = {disabled}
      onClick = {onClick}
      className = {clsx(
        'bg-[#9FA6B2] text-white rounded-[8px]',
        'w-[520px] h-[50px]',
        'mt-[20px] ml-[20px]',
        'px-[236px] py-[14px]',
        'flex items-center justify-center gap-[10px]',
      )}
      {...rest}
    >
      {children}
    </button>
  );
};