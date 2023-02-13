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
    supabase.auth.getSession().then(async ({ data }) => {
      if (data) {
        await initializeUser({ session: data.session });
      }
    });
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        initializeUser({ session });
      } else if (event === 'SIGNED_OUT') {
        resetUser();
        resetCoordinates();
      }
    });
  }, [initializeUser, resetCoordinates, resetUser]);

  return <></>;
};
