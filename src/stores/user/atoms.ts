import { atom } from 'recoil';

import type { UserAtom } from '@/stores/user/types';

export const userAtom = atom<UserAtom>({
  key: 'userAtom',
  default: null,
});
