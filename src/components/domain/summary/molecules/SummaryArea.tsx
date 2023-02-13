import React, { useCallback } from 'react';

import { SummaryRadio } from '@/components/domain/summary/atoms/SummaryRadio';
import { useNotation } from '@/components/domain/summary/hooks/useNotation';
import { SummaryField } from '@/components/domain/summary/molecules/SummaryField';

import type { CoordinateId, SummaryNotation } from '@/stores/coordinate/types';

import { useTranslationContext } from '@/providers/I18nProvider';

export type SummaryAreaPresentationalProps = {
  coordinateId: CoordinateId;
  label: string;
  notation: SummaryNotation;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const SummaryAreaPresentational = ({
  coordinateId,
  label,
  notation,
  onChange,
}: SummaryAreaPresentationalProps) => {
  return (
    <div className="grid h-full grid-cols-6 grid-rows-6 gap-4">
      <div className="col-span-6 row-span-1">
        <p className="text-xl font-bold">{label}</p>
      </div>
      <div className="col-span-5 row-span-5 place-self-center">
        <SummaryField coordinateId={coordinateId} notation={notation} />
      </div>
      <div className="col-span-1 row-span-5 self-center">
        <SummaryRadio
          coordinateId={coordinateId}
          notation={notation}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export type SummaryAreaProps = {
  coordinateId: CoordinateId;
};

export const SummaryArea = ({ coordinateId }: SummaryAreaProps) => {
  const t = useTranslationContext();
  const label = t.SUMMARY.LABEL;

  const [notation, setNotation] = useNotation();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const notation = e.target.value as SummaryNotation;
      setNotation(notation);
    },
    [setNotation]
  );

  return (
    <SummaryAreaPresentational
      coordinateId={coordinateId}
      label={label}
      notation={notation}
      onChange={handleChange}
    />
  );
};
