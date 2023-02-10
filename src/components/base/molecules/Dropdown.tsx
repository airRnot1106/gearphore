import { Children } from 'react';

import type { Align, Position, Size } from '@/types';

export type DropdownProps = {
  title?: string | undefined;
  label: React.ReactNode;
  labelSize?: Size;
  position?: Position;
  align?: Align;
  children: React.ReactElement;
};

export const Dropdown = ({
  title,
  label,
  labelSize,
  position,
  align,
  children,
}: DropdownProps) => {
  return (
    <div
      className={
        'dropdown ' +
        (position === 'top' ? 'dropdown-top ' : '') +
        (position === 'bottom' ? 'dropdown-bottom ' : '') +
        (position === 'left' ? 'dropdown-left ' : '') +
        (position === 'right' ? 'dropdown-right ' : '') +
        (align === 'end' ? 'dropdown-end ' : '')
      }
    >
      <label
        title={title}
        tabIndex={0}
        className={
          'btn m-1 bg-base-200 ' +
          (labelSize === 'xs' ? 'btn-xs ' : '') +
          (labelSize === 'sm' ? 'btn-sm ' : '') +
          (labelSize === 'md' ? 'btn-md ' : '') +
          (labelSize === 'lg' ? 'btn-lg ' : '')
        }
      >
        {label}
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu rounded-box w-52 bg-base-200 p-2 shadow"
      >
        {Children.map(children.props.children, (menu) => (
          <li>{menu}</li>
        ))}
      </ul>
    </div>
  );
};
