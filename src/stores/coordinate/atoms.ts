import { atom, atomFamily, selectorFamily } from 'recoil';

import type {
  CoordinateAtom,
  CoordinateAtomParam,
  CoordinateIdsAtom,
  PowerAtom,
  PowerAtomParam,
} from '@/stores/coordinate/types';

export const coordinateIdsAtom = atom<CoordinateIdsAtom>({
  key: 'CoordinateIdsAtom',
  default: [],
});

export const coordinateAtom = atomFamily<CoordinateAtom, CoordinateAtomParam>({
  key: 'CoordinateAtom',
  default: selectorFamily<CoordinateAtom, CoordinateAtomParam>({
    key: 'CoordinateAtom/Default',
    get:
      ({ id }) =>
      () => ({
        id,
        name: 'New',
      }),
  }),
});

export const powerAtom = atomFamily<PowerAtom, PowerAtomParam>({
  key: 'PowerAtom',
  default: selectorFamily<PowerAtom, PowerAtomParam>({
    key: 'PowerAtom/Default',
    get:
      ({ slot }) =>
      () => ({
        slot,
        name: 'NULL',
      }),
  }),
});
