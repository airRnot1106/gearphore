import { atom, atomFamily, selectorFamily } from 'recoil';

import type {
  DialogAtom,
  DialogAtomParam,
  DialogIdsAtom,
} from '@/stores/dialog/types';

export const dialogIdsAtom = atom<DialogIdsAtom>({
  key: 'dialogIdsAtom',
  default: [],
});

export const dialogAtom = atomFamily<DialogAtom, DialogAtomParam>({
  key: 'dialogsAtom',
  default: selectorFamily<DialogAtom, DialogAtomParam>({
    key: 'dialogsAtom/Default',
    get:
      ({ id }) =>
      () => ({
        id,
        level: 'error',
        message: 'NOT_INITIALIZED_MESSAGE',
        isShown: false,
      }),
  }),
});
