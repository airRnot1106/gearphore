import { useRecoilCallback } from 'recoil';
import { v4 as uuidV4 } from 'uuid';

import { logAtom, logIdsAtom } from '@/stores/log/atoms';
import type { Log, LogAtomParam } from '@/stores/log/types';
import { logCodeToLogLevel } from '@/stores/log/types';

import type { CallbackInterface } from 'recoil';

/* Operation */

const pushLogId = (callback: CallbackInterface, param: Pick<Log, 'id'>) => {
  const { snapshot, set } = callback;
  const { id } = param;
  if (!snapshot.getLoadable(logIdsAtom).getValue().includes(id)) {
    set(logIdsAtom, (prev) => [...prev, id]);
  }
  uninitializeLog(callback, param);
};

const addLog = (
  callback: CallbackInterface,
  param: Omit<Log, 'isProcessed'>
) => {
  const { set } = callback;
  const log = { ...param, isProcessed: false };
  const { id } = param;
  set(logAtom({ id }), (prev) => ({ ...prev, log }));
};

const uninitializeLog = (callback: CallbackInterface, param: LogAtomParam) => {
  const { reset } = callback;
  reset(logAtom(param));
};

const processLog = (callback: CallbackInterface, param: LogAtomParam) => {
  const { set } = callback;
  set(logAtom(param), (prev) => ({ ...prev, isProcessed: true }));
};

/* Hook */

export const useCreateLog = () =>
  useRecoilCallback((callback) => (param: Pick<Log, 'code' | 'message'>) => {
    const id = uuidV4();
    const { code, message } = param;
    const level = logCodeToLogLevel[code];
    pushLogId(callback, { id });
    addLog(callback, { id, code, level, message });
    return id;
  });

export const useAddLog = () =>
  useRecoilCallback(
    (callback) => (param: Pick<Log, 'id' | 'code' | 'message'>) => {
      const { id, code, message } = param;
      const level = logCodeToLogLevel[code];
      pushLogId(callback, param);
      addLog(callback, { id, code, level, message });
    }
  );

export const useProcessLog = () =>
  useRecoilCallback((callback) => (param: LogAtomParam) => {
    processLog(callback, param);
  });
