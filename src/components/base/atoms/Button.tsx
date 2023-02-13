import React from 'react';

import type { Color, Shape, Size } from '@/types';

export type ButtonProps = {
  title?: string | undefined;
  htmlFor?: string | undefined;
  size?: Size;
  color?: Color;
  shape?: Shape;
  decorations?:
    | (
        | 'ghost'
        | 'outline'
        | 'glass'
        | 'shadow'
        | 'no-animation'
        | 'wide'
        | 'block'
      )[]
    | undefined;
  isDisabled?: boolean | undefined;
  onClick?: ((e: React.MouseEvent) => void) | undefined;
  children: React.ReactNode;
};

export const Button = ({
  title,
  htmlFor,
  size,
  color,
  shape,
  decorations,
  isDisabled,
  onClick,
  children,
}: ButtonProps) => {
  return (
    <label title={title} htmlFor={htmlFor}>
      <button
        className={
          'btn ' +
          (size === 'xs' ? 'btn-xs ' : '') +
          (size === 'sm' ? 'btn-sm ' : '') +
          (size === 'md' ? 'btn-md ' : '') +
          (size === 'lg' ? 'btn-lg ' : '') +
          (color === 'primary' ? 'btn-primary ' : '') +
          (color === 'secondary' ? 'btn-secondary ' : '') +
          (color === 'accent' ? 'btn-accent ' : '') +
          (color === 'info' ? 'btn-info ' : '') +
          (color === 'success' ? 'btn-success ' : '') +
          (color === 'warning' ? 'btn-warning ' : '') +
          (color === 'error' ? 'btn-error ' : '') +
          (shape === 'square' ? 'btn-square ' : '') +
          (shape === 'circle' ? 'btn-circle ' : '') +
          (decorations?.includes('ghost') ? 'btn-ghost ' : '') +
          (decorations?.includes('outline') ? 'btn-outline ' : '') +
          (decorations?.includes('glass') ? 'glass ' : '') +
          (decorations?.includes('shadow')
            ? 'shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] '
            : '') +
          (decorations?.includes('no-animation') ? 'no-animation ' : '') +
          (decorations?.includes('wide') ? 'btn-wide ' : '') +
          (decorations?.includes('block') ? 'btn-block ' : '') +
          (isDisabled ? 'btn-disabled loading ' : '')
        }
        onClick={onClick}
      >
        {isDisabled ? undefined : children}
      </button>
    </label>
  );
};
