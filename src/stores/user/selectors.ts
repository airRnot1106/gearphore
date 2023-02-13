import { selector } from 'recoil';

import { userAtom } from '@/stores/user/atoms';
import type { UserState } from '@/stores/user/types';

import type { RecoilSelectorGetter } from '@/types';

// Getter

const getUser = (getter: RecoilSelectorGetter) => {
  const { get } = getter;
  const user = get(userAtom);
  return user;
};

// State

export const userState = selector<UserState>({
  key: 'userState',
  get: (getter) => {
    const user = getUser(getter);
    return user;
  },
});
