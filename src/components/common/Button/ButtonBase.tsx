'use client';

import clsx from 'clsx';
import type { ButtonHTMLAttributes } from 'react';

interface BaseButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const baseStyle = `
  inline-flex items-center justify-center
  transition-colors
  disabled:cursor-not-allowed
`;

export default function BaseButton({
  className,
  type = 'button',
  ...rest
}: BaseButtonProps) {
  return (
    <button
      type={type}
      className={clsx(
        baseStyle,
        className,
      )}
      {...rest}
    />
  );
}