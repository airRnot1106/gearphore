import { PowerImage } from '@/components/domain/power/atoms/PowerImage';

import type {
  PowerName,
  SummaryNotation,
  SummaryTotal,
} from '@/stores/coordinate/types';

export type SummaryImagePresentationalProps = {
  power: PowerName;
  total: SummaryTotal;
  notation: SummaryNotation;
};

export const SummaryImagePresentational = ({
  power,
  total,
  notation,
}: SummaryImagePresentationalProps) => {
  return (
    <span className="flex items-center space-x-1">
      <PowerImage power={{ slot: 1, name: power }} />
      <span className="font-mono text-lg">x{total[notation]}</span>
    </span>
  );
};

export type SummaryImageProps = SummaryImagePresentationalProps;

export const SummaryImage = ({ power, total, notation }: SummaryImageProps) => {
  return (
    <SummaryImagePresentational
      power={power}
      total={total}
      notation={notation}
    />
  );
};
