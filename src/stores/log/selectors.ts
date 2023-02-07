import { selector, selectorFamily } from 'recoil';

import { logAtom, logIdsAtom } from '@/stores/log/atoms';
import type { LogIdsState, LogState, LogStateParam } from '@/stores/log/types';

export const logIdsState = selector<LogIdsState>({
  key: 'logIdsState',
  get: ({ get }) => {
    const logIds = get(logIdsAtom);
    return logIds;
  },
});

export const logState = selectorFamily<LogState, LogStateParam>({
  key: 'logState',
  get:
    (param) =>
    ({ get }) => {
      const log = get(logAtom(param));
      return log;
    },
});
