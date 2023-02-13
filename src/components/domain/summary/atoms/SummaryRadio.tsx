import type { RadioProps } from '@/components/base/atoms/Radio';
import { Radio } from '@/components/base/atoms/Radio';

import type { CoordinateId, SummaryNotation } from '@/stores/coordinate/types';

export type SummaryRadioPresentationalProps = Pick<
  RadioProps,
  'name' | 'values' | 'checked' | 'onChange'
>;

export const SummaryRadioPresentational = ({
  name,
  values,
  checked,
  onChange,
}: SummaryRadioPresentationalProps) => {
  return (
    <Radio
      name={name}
      color="secondary"
      values={values}
      checked={checked}
      onChange={onChange}
    />
  );
};

export type SummaryRadioProps = {
  coordinateId: CoordinateId;
  notation: SummaryNotation;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const SummaryRadio = ({
  coordinateId,
  notation,
  onChange,
}: SummaryRadioProps) => {
  const name = `r-${coordinateId}`;

  const values = [
    { label: '57', value: 'NOTATION_57' },
    { label: '39', value: 'NOTATION_39' },
  ] satisfies { label: string; value: SummaryNotation }[];

  return (
    <SummaryRadioPresentational
      name={name}
      values={values}
      checked={notation}
      onChange={onChange}
    />
  );
};
