import { selector, selectorFamily } from 'recoil';

import {
  coordinateAtom,
  coordinateIdsAtom,
  powerAtom,
} from '@/stores/coordinate/atoms';
import { gears, slots } from '@/stores/coordinate/types';
import type {
  CoordinateAtomParam,
  CoordinateBaseState,
  CoordinateBaseStateParam,
  CoordinateIdsState,
  Gear,
  PowersOfGear,
  PowersOfCoordinate,
  PowerAtomParam,
  CoordinateFullState,
  CoordinateFullStateParam,
  CoordinateJsonState,
  CoordinateJsonStateParam,
  PowerState,
  PowerStateParam,
  SummariesState,
  SummariesStateParam,
  Summary,
  CoordinateId,
  CoordinateIdIndexState,
} from '@/stores/coordinate/types';

import type { RecoilSelectorGetter } from '@/types';

// Getter

const getCoordinateIds = (getter: RecoilSelectorGetter) => {
  const { get } = getter;
  const ids = get(coordinateIdsAtom);
  return ids;
};

const getCoordinateIdIndex = (
  getter: RecoilSelectorGetter,
  id: CoordinateId
) => {
  const ids = getCoordinateIds(getter);
  const index = ids.indexOf(id);
  return index;
};

const getCoordinateBase = (
  getter: RecoilSelectorGetter,
  param: CoordinateAtomParam
) => {
  const { get } = getter;
  const coordinate = get(coordinateAtom(param));
  return coordinate;
};

const getCoordinateFull = (
  getter: RecoilSelectorGetter,
  param: CoordinateAtomParam
) => {
  const base = getCoordinateBase(getter, param);
  const powers = getPowersOfCoordinate(getter, param);
  return { ...base, gears: powers };
};

const getCoordinateJson = (
  getter: RecoilSelectorGetter,
  param: CoordinateAtomParam
) => {
  const full = getCoordinateFull(getter, param);
  const json = JSON.stringify(full);
  return json;
};

const gearCoordinateAllJson = (getter: RecoilSelectorGetter) => {
  const ids = getCoordinateIds(getter);
  const coordinates = ids.map((id) => getCoordinateFull(getter, { id }));
  const json = JSON.stringify(coordinates);
  return json;
};

const getPower = (getter: RecoilSelectorGetter, param: PowerAtomParam) => {
  const { get } = getter;
  const power = get(powerAtom(param));
  return power;
};

const getPowersOfGear = (
  getter: RecoilSelectorGetter,
  param: Omit<PowerAtomParam, 'slot'>
) => {
  const powers = slots.map((slot) =>
    getPower(getter, { ...param, slot })
  ) as PowersOfGear;
  return powers;
};

const getPowersOfCoordinate = (
  getter: RecoilSelectorGetter,
  param: CoordinateAtomParam
) => {
  const powers = Object.assign(
    {},
    ...gears.map(
      (gear) =>
        ({ [gear]: getPowersOfGear(getter, { ...param, gear }) } as Record<
          Gear,
          PowersOfGear
        >)
    )
  ) as PowersOfCoordinate;
  return powers;
};

const getSummary = (
  getter: RecoilSelectorGetter,
  param: CoordinateAtomParam
) => {
  const powers = getPowersOfCoordinate(getter, param);
  const summary = gears
    .flatMap((gear) => powers[gear])
    .reduce((acc, cur) => {
      const { slot, name: power } = cur;
      let target = acc.find((item) => item.power === power);
      if (!target) {
        target = {
          power,
          main: 0,
          sub: 0,
          total: { NOTATION_57: 0, NOTATION_39: 0 },
        };
        acc.push(target);
      }
      if (slot === 0) {
        target.main++;
        target.total.NOTATION_57 += 10;
        target.total.NOTATION_39 += 10;
      } else {
        target.sub++;
        target.total.NOTATION_57 += 3;
        target.total.NOTATION_39 += 1;
      }
      return acc;
    }, [] as Summary[]);
  return summary;
};

// State

export const coordinateIdsState = selector<CoordinateIdsState>({
  key: 'CoordinateIdsState',
  get: (getter) => {
    const ids = getCoordinateIds(getter);
    return ids;
  },
});

export const coordinateIdIndexState = selectorFamily<
  CoordinateIdIndexState,
  CoordinateId
>({
  key: 'CoordinateIdIndexState',
  get: (id) => (getter) => {
    const index = getCoordinateIdIndex(getter, id);
    return index;
  },
});

export const coordinateBaseState = selectorFamily<
  CoordinateBaseState,
  CoordinateBaseStateParam
>({
  key: 'CoordinateBaseState',
  get: (param) => (getter) => {
    const coordinate = getCoordinateBase(getter, param);
    return coordinate;
  },
});

export const coordinateFullState = selectorFamily<
  CoordinateFullState,
  CoordinateFullStateParam
>({
  key: 'CoordinateFullState',
  get: (param) => (getter) => {
    const full = getCoordinateFull(getter, param);
    return full;
  },
});

export const coordinateJsonState = selectorFamily<
  CoordinateJsonState,
  CoordinateJsonStateParam
>({
  key: 'CoordinateJsonState',
  get: (param) => (getter) => {
    const json = getCoordinateJson(getter, param);
    return json;
  },
});

export const coordinateAllJsonState = selector<CoordinateJsonState>({
  key: 'CoordinateAllJsonState',
  get: (getter) => {
    const json = gearCoordinateAllJson(getter);
    return json;
  },
});

export const powerState = selectorFamily<PowerState, PowerStateParam>({
  key: 'PowerState',
  get: (param) => (getter) => {
    const power = getPower(getter, param);
    return power;
  },
});

export const summariesState = selectorFamily<
  SummariesState,
  SummariesStateParam
>({
  key: 'SummariesState',
  get: (param) => (getter) => {
    const summary = getSummary(getter, param);
    return summary;
  },
});
