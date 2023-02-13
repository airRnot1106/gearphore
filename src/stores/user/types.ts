import { z } from 'zod';

/* Type & Schema */

export const userSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  email: z.string().email().optional(),
  avatar_url: z.string().url().optional(),
});
export type User = z.infer<typeof userSchema>;

/* Atom */

export type UserAtom = User | null;

/* State */

export type UserState = User | null;
