import { X } from 'lucide-react';

import type { Color, Size } from '@/types';

export type InputProps = {
  size?: Size;
  color?: Color;
  decorations?: ('bordered' | 'ghost')[] | undefined;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onDelete: () => void;
};

export const Input = ({
  size,
  color,
  decorations,
  value,
  onChange,
  onKeyDown,
  onDelete,
}: InputProps) => {
  return (
    <div className="flex items-center">
      <input
        type="text"
        className={
          'input pr-8 ' +
          (size === 'xs' ? 'input-xs ' : '') +
          (size === 'sm' ? 'input-sm ' : '') +
          (size === 'md' ? 'input-md ' : '') +
          (size === 'lg' ? 'input-lg ' : '') +
          (color === 'primary' ? 'input-primary ' : '') +
          (color === 'secondary' ? 'input-secondary ' : '') +
          (color === 'accent' ? 'input-accent ' : '') +
          (color === 'info' ? 'input-info ' : '') +
          (color === 'success' ? 'input-success ' : '') +
          (color === 'warning' ? 'input-warning ' : '') +
          (color === 'error' ? 'input-error ' : '') +
          (decorations?.includes('bordered') ? 'input-bordered ' : '') +
          (decorations?.includes('ghost') ? 'input-ghost ' : '')
        }
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      <button
        className={'-ml-7 ' + (value.length ? '' : 'hidden')}
        onClick={onDelete}
      >
        <X color="gray" />
      </button>
    </div>
  );
};
