import { selector } from 'recoil';

import { dialogIdsAtom, dialogAtom } from '@/stores/dialog/atoms';
import type { DialogId, DialogsState } from '@/stores/dialog/types';

import type { RecoilSelectorGetter } from '@/types';

// Getter

const getDialogIds = (getter: RecoilSelectorGetter) => {
  const { get } = getter;
  const ids = get(dialogIdsAtom);
  return ids;
};

const getDialog = (getter: RecoilSelectorGetter, param: { id: DialogId }) => {
  const { get } = getter;
  const dialog = get(dialogAtom(param));
  return dialog;
};

const getDialogs = (
  getter: RecoilSelectorGetter,
  param: { ids: DialogId[] }
) => {
  const { get } = getter;
  const { ids } = param;
  const dialogs = ids.map((id) => getDialog(getter, { id }));
  return dialogs;
};

// Hook

export const dialogsState = selector<DialogsState>({
  key: 'dialogsState',
  get: (getter) => {
    const ids = getDialogIds(getter);
    const dialogs = getDialogs(getter, { ids });
    return dialogs;
  },
});
