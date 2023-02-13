import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env['NEXT_PUBLIC_SUPABASE_URL'] as string,
  process.env['NEXT_PUBLIC_SUPABASE_API_KEY'] as string
);

export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/ja`,
    },
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};
