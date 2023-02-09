import { atomFamily, selectorFamily } from 'recoil';

import type { DialogAtom, DialogAtomParam } from '@/stores/dialog/types';

export const dialogAtom = atomFamily<DialogAtom, DialogAtomParam>({
  key: 'dialogAtom',
  default: selectorFamily<DialogAtom, DialogAtomParam>({
    key: 'dialogAtom/Default',
    get:
      ({ id }) =>
      () => ({
        id,
        messageParams: [],
        isShown: false,
      }),
  }),
});
