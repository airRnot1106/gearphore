import { useRecoilCallback } from 'recoil';
import { v4 as uuidV4 } from 'uuid';

import { dialogIdsAtom, dialogAtom } from '@/stores/dialog/atoms';
import { dialogsState } from '@/stores/dialog/selectors';
import type { Dialog } from '@/stores/dialog/types';

import type { CallbackInterface } from 'recoil';

/* Operation */

const pushDialog = (callback: CallbackInterface) => {
  const { set } = callback;
  const id = uuidV4();
  set(dialogIdsAtom, (prev) => [...prev, id]);
  return id;
};

const initializeDialog = (
  callback: CallbackInterface,
  param: Pick<Dialog, 'id' | 'level' | 'message'>
) => {
  const { set } = callback;
  const { id, level, message } = param;
  set(dialogAtom({ id }), (prev) => ({
    ...prev,
    level,
    message,
    isShown: true,
  }));
};

const hideDialog = (callback: CallbackInterface, param: Pick<Dialog, 'id'>) => {
  const { set } = callback;
  set(dialogAtom(param), (prev) => ({
    ...prev,
    isShown: false,
  }));
};

const hideAllDialogs = (callback: CallbackInterface) => {
  const { snapshot } = callback;
  const ids = snapshot.getLoadable(dialogIdsAtom).getValue();
  ids.forEach((id) => {
    hideDialog(callback, { id });
  });
};

const cleanupDialog = (callback: CallbackInterface) => {
  const { snapshot, set } = callback;
  const dialogs = snapshot.getLoadable(dialogsState).getValue();
  const ids = dialogs
    .filter((dialog) => dialog.isShown)
    .map((dialog) => dialog.id);
  set(dialogIdsAtom, ids);
};

/* Hook */

export const useCreateDialog = () => {
  return useRecoilCallback(
    (callback) => (param: Pick<Dialog, 'level' | 'message'>) => {
      hideAllDialogs(callback);
      const id = pushDialog(callback);
      initializeDialog(callback, { ...param, id });
      setTimeout(() => {
        hideDialog(callback, { id });
      }, 2000);
    }
  );
};

export const useCleanupDialog = () => {
  return useRecoilCallback((callback) => () => {
    cleanupDialog(callback);
  });
};
