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
        name: '',
      }),
  }),
});

export const powerAtom = atomFamily<PowerAtom, PowerAtomParam>({
  key: 'PowerAtom',
  default: 'NULL',
});
