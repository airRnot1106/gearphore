'use client';

import { useEffect } from 'react';

import { useResetCoordinates } from '@/stores/coordinate/operations';
import { useInitializeUser, useResetUser } from '@/stores/user/operations';

import { supabase } from '@/utils/supabase';

export const Authenticator = () => {
  const initializeUser = useInitializeUser();
  const resetUser = useResetUser();
  const resetCoordinates = useResetCoordinates();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      console.log(data);
      if (data) {
        initializeUser({ session: data.session });
      }
    });
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        console.log('SIGNED_IN', session);
        initializeUser({ session });
      } else if (event === 'SIGNED_OUT') {
        console.log('SIGN_OUT');
        resetUser();
        resetCoordinates();
      }
    });
  }, [initializeUser, resetCoordinates, resetUser]);

  return <></>;
};
