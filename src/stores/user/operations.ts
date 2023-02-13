import { useRecoilCallback } from 'recoil';

import { userAtom } from '@/stores/user/atoms';

import type { Session } from '@supabase/supabase-js';
import type { CallbackInterface } from 'recoil';

/* Operation */

const initializeUser = (
  callback: CallbackInterface,
  param: { session: Session }
) => {
  const { set } = callback;
  const { session } = param;
  const {
    user: { id, email, identities },
  } = session;
  const identity = (identities ?? [])[0];
  const identityData = identity?.identity_data;
  const { avatar_url, name } = identityData ?? {
    avatar_url: undefined,
    name: undefined,
  };
  set(userAtom, { id, email, avatar_url, name });
};

const resetUser = (callback: CallbackInterface) => {
  const { reset } = callback;
  reset(userAtom);
};

/* Hook */

export const useInitializeUser = () => {
  return useRecoilCallback(
    (callback) => (param: { session: Session | null }) => {
      const { session } = param;
      if (!session) return;
      initializeUser(callback, { session });
    }
  );
};

export const useResetUser = () => {
  return useRecoilCallback((callback) => () => {
    resetUser(callback);
  });
};
