import { selectorFamily } from 'recoil';

import { dialogAtom } from '@/stores/dialog/atoms';
import type { DialogState, DialogStateParam } from '@/stores/dialog/types';

export const dialogState = selectorFamily<DialogState, DialogStateParam>({
  key: 'dialogState',
  get:
    (param) =>
    ({ get }) => {
      const dialog = get(dialogAtom(param));
      return dialog;
    },
});
