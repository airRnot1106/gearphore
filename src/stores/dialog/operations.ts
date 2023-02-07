import { useRecoilCallback } from 'recoil';

import { dialogAtom } from '@/stores/dialog/atoms';
import type { DialogAtomParam } from '@/stores/dialog/types';
import { dialogIdSchema, dialogIdToMs } from '@/stores/dialog/types';

import { useSafeParseData } from '@/hooks/useSafeParseData';

import type { CallbackInterface } from 'recoil';

/* Operation */

const showDialog = (callback: CallbackInterface, param: DialogAtomParam) => {
  const { set } = callback;
  set(dialogAtom(param), (prev) => ({ ...prev, isShown: true }));
};

const hideDialog = (callback: CallbackInterface, param: DialogAtomParam) => {
  const { set } = callback;
  set(dialogAtom(param), (prev) => ({ ...prev, isShown: false }));
};

/* Hook */

export const useShowDialog = () => {
  const { safeParseData } = useSafeParseData();
  return useRecoilCallback((callback) => (param: DialogAtomParam) => {
    const { id } = param;
    const result = safeParseData(dialogIdSchema, id);
    if (!result.success) return;
    showDialog(callback, param);
    const ms = dialogIdToMs[id];
    setTimeout(() => {
      hideDialog(callback, param);
    }, ms);
  });
};
