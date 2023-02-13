import { useRecoilCallback } from 'recoil';

import { userAtom } from '@/stores/user/atoms';

import { supabase } from '@/utils/supabase';

import type { Session } from '@supabase/supabase-js';
import type { CallbackInterface } from 'recoil';

/* Operation */

const initializeUser = async (
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
  const existsUser = await supabase.from('users').select('id').eq('id', id);
  if (!existsUser.data?.length) {
    await supabase.from('users').insert({ id, email, avatar_url, name });
    await supabase.from('coordinates').insert({ id, coordinate_json: '[]' });
  }
};

const resetUser = (callback: CallbackInterface) => {
  const { reset } = callback;
  reset(userAtom);
};

/* Hook */

export const useInitializeUser = () => {
  return useRecoilCallback(
    (callback) => async (param: { session: Session | null }) => {
      const { session } = param;
      if (!session) return;
      await initializeUser(callback, { session });
    }
  );
};

export const useResetUser = () => {
  return useRecoilCallback((callback) => () => {
    resetUser(callback);
  });
};
