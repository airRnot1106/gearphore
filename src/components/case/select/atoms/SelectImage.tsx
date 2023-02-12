import type { LabelValue } from '@/types';

export type SelectImageProps = {
  current: React.ReactNode;
  options: LabelValue[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const SelectImage = ({
  current,
  options,
  onChange,
}: SelectImageProps) => {
  return (
    <div className="relative inline-block">
      {current}
      <select
        className="absolute top-0 left-0 h-full w-full opacity-0"
        onChange={onChange}
      >
        {options.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};
