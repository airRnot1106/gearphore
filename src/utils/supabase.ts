import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';

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

export const coordinateDatabaseSchema = z.object({
  id: z.string().uuid(),
  coordinate_json: z.string(),
  created_at: z.date(),
});
export type CoordinateDatabase = z.infer<typeof coordinateDatabaseSchema>;

export const existsUser = async (id: string) => {
  const { data, error } = await supabase
    .from('coordinates')
    .select('id')
    .eq('id', id)
    .single();
  return { data, error };
};

export const insertUser = async (id: string) => {
  const { data, error } = await supabase
    .from('coordinates')
    .insert({ id, coordinate_json: '[]' })
    .single();
  return { data, error };
};
