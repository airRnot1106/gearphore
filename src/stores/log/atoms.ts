import { atom, atomFamily, selectorFamily } from 'recoil';

import type { LogIdsAtom, LogAtom, LogAtomParam } from '@/stores/log/types';

export const logIdsAtom = atom<LogIdsAtom>({
  key: 'logIdsAtom',
  default: [],
});

export const logAtom = atomFamily<LogAtom, LogAtomParam>({
  key: 'logAtom',
  default: selectorFamily<LogAtom, LogAtomParam>({
    key: 'logAtom/Default',
    get: (param) => () => ({
      id: param.id,
      code: 'NOT_INITIALIZED_LOG',
      level: 'ERROR',
      message: '',
      isProcessed: false,
    }),
  }),
});
