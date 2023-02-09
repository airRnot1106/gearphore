import { useRecoilCallback } from 'recoil';

import { dialogAtom } from '@/stores/dialog/atoms';
import type { DialogAtomParam } from '@/stores/dialog/types';
import { dialogIdSchema, dialogIdToMs } from '@/stores/dialog/types';

import type { CallbackInterface } from 'recoil';

/* Operation */

const showDialog = (
  callback: CallbackInterface,
  param: DialogAtomParam,
  messageParams: string[]
) => {
  const { set } = callback;
  set(dialogAtom(param), (prev) => ({ ...prev, messageParams, isShown: true }));
};

const hideDialog = (callback: CallbackInterface, param: DialogAtomParam) => {
  const { set } = callback;
  set(dialogAtom(param), (prev) => ({
    ...prev,
    messageParams: [],
    isShown: false,
  }));
};

/* Hook */

export const useShowDialog = () => {
  return useRecoilCallback(
    (callback) => (param: DialogAtomParam, messageParams: string[]) => {
      const { id } = param;
      const result = dialogIdSchema.safeParse(id);
      if (!result.success) throw new Error('[FATAL]: Invalid dialog id');
      showDialog(callback, param, messageParams);
      const { data } = result;
      const ms = dialogIdToMs[data];
      setTimeout(() => {
        hideDialog(callback, param);
      }, ms);
    }
  );
};
