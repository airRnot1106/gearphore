import { useRecoilValue } from 'recoil';

import { SummaryImage } from '@/components/domain/summary/atoms/SummaryImage';

import { summariesState } from '@/stores/coordinate/selectors';
import type {
  CoordinateId,
  Summary,
  SummaryNotation,
} from '@/stores/coordinate/types';

export type SummaryFieldPresentationalProps = {
  summaries: Summary[];
  notation: SummaryNotation;
};

export const SummaryFieldPresentational = ({
  summaries,
  notation,
}: SummaryFieldPresentationalProps) => {
  return (
    <div
      className={
        'grid place-items-center gap-x-6 gap-y-5 ' +
        (summaries.length === 1 ? 'grid-cols-1 ' : '') +
        (summaries.length === 2 ? 'grid-cols-2 ' : 'grid-cols-3')
      }
    >
      {summaries.map((summary, index) => {
        const { power, total } = summary;
        return (
          <div key={index} className="place-self-start">
            <SummaryImage power={power} total={total} notation={notation} />
          </div>
        );
      })}
    </div>
  );
};

export type SummaryFieldProps = {
  coordinateId: CoordinateId;
  notation: SummaryNotation;
};

export const SummaryField = ({ coordinateId, notation }: SummaryFieldProps) => {
  const summaries = useRecoilValue(summariesState({ id: coordinateId }));

  return (
    <SummaryFieldPresentational summaries={summaries} notation={notation} />
  );
};
