import { useRef } from 'react';

import { Edit3, Terminal } from 'lucide-react';

import type { InputProps } from '@/components/base/atoms/Input';
import { Input } from '@/components/base/atoms/Input';
import { useToggleInput } from '@/components/case/toggle/hooks/useToggleInput';

import type { CssWidth } from '@/types';

export type ToggleInputProps = Omit<InputProps, 'decorations' | 'onKeyDown'> & {
  editTitle?: string | undefined;
  width?: CssWidth | undefined;
};

export const ToggleInput = ({
  editTitle,
  width = [100, '%'],
  size,
  color,
  value,
  onChange,
  onDelete,
}: ToggleInputProps) => {
  const inputRef = useRef<HTMLDivElement>(null);

  const { isEditable, handleEnable, handleKeyDown } = useToggleInput(inputRef);

  const EnabledInput = (
    <>
      <div>
        <Terminal size="16" />
      </div>
      <Input
        size={size}
        color={color}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        onDelete={onDelete}
      />
    </>
  );

  const [wNum, unit] = width;

  const DisabledInput = (
    <>
      <button title={editTitle} className="mt-1" onClick={handleEnable}>
        <Edit3 size="16" />
      </button>
      <p
        title={value}
        className="truncate text-2xl"
        style={{ width: `${wNum}${unit}` }}
      >
        {value}
      </p>
    </>
  );

  return (
    <div ref={inputRef} className="flex items-center space-x-2">
      {isEditable ? EnabledInput : DisabledInput}
    </div>
  );
};
