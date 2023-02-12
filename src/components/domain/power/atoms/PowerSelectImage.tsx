import React, { useCallback } from 'react';

import { useRecoilValue } from 'recoil';

import type { SelectImageProps } from '@/components/case/select/atoms/SelectImage';
import { SelectImage } from '@/components/case/select/atoms/SelectImage';
import { PowerImage } from '@/components/domain/power/atoms/PowerImage';

import { useUpdatePower } from '@/stores/coordinate/operations';
import { powerState } from '@/stores/coordinate/selectors';
import type {
  CoordinateId,
  Gear,
  GearWithCommon,
  PowerName,
  Slot,
} from '@/stores/coordinate/types';
import {
  gearsWithCommon,
  powerToOrderEachGear,
} from '@/stores/coordinate/types';

import { useTranslationContext } from '@/providers/I18nProvider';

import type { LabelValue } from '@/types';
import { entries } from '@/utils';

export type PowerSelectImagePresentationalProps = SelectImageProps;

export const PowerSelectImagePresentational = ({
  current,
  options,
  onChange,
}: PowerSelectImagePresentationalProps) => {
  return (
    <SelectImage current={current} options={options} onChange={onChange} />
  );
};

export type PowerSelectImageProps = {
  coordinateId: CoordinateId;
  gear: Gear;
  slot: Slot;
};

export const PowerSelectImage = ({
  coordinateId,
  gear,
  slot,
}: PowerSelectImageProps) => {
  const power = useRecoilValue(powerState({ id: coordinateId, gear, slot }));
  const updatePower = useUpdatePower();

  const Image = <PowerImage power={power} />;

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const power = e.target.value as PowerName;
      updatePower({ id: coordinateId, gear, slot, power });
    },
    [coordinateId, gear, slot, updatePower]
  );

  const t = useTranslationContext();

  const optionsEachGear = Object.fromEntries(
    gearsWithCommon.map((gear) => [
      gear,
      entries(powerToOrderEachGear).flatMap(([power, type]) =>
        type[gear] !== null ? [{ label: t.POWER[power], value: power }] : []
      ),
    ])
  ) as Record<GearWithCommon, LabelValue[]>;

  const options = optionsEachGear[gear];

  return (
    <PowerSelectImagePresentational
      current={Image}
      options={options}
      onChange={handleChange}
    />
  );
};
