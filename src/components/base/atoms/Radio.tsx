import type { Color, LabelValue } from '@/types';

export type RadioProps = {
  name: string;
  color: Color;
  values: LabelValue[];
  checked: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Radio = ({
  name,
  color,
  values,
  checked,
  onChange,
}: RadioProps) => {
  return (
    <div className="flex flex-col space-y-3">
      {values.map(({ label, value }) => (
        <div key={value}>
          <label className="flex cursor-pointer items-center space-x-3">
            <span className="font-mono">{label}</span>
            <input
              type="radio"
              name={name}
              className={
                'radio ' +
                (color === 'primary' ? 'radio-primary ' : '') +
                (color === 'secondary' ? 'radio-secondary ' : '') +
                (color === 'accent' ? 'radio-accent ' : '') +
                (color === 'info' ? 'radio-info ' : '') +
                (color === 'success' ? 'radio-success ' : '') +
                (color === 'warning' ? 'radio-warning ' : '') +
                (color === 'error' ? 'radio-error ' : '')
              }
              value={value}
              checked={value === checked}
              onChange={onChange}
            />
          </label>
        </div>
      ))}
    </div>
  );
};
