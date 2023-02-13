import { z } from 'zod';

import { levelSchema } from '@/types';

/* Type & Schema */

export const dialogIdSchema = z.string().uuid();
export type DialogId = z.infer<typeof dialogIdSchema>;

export const dialogSchema = z.object({
  id: dialogIdSchema,
  level: levelSchema,
  message: z.string(),
  isShown: z.boolean(),
});
export type Dialog = z.infer<typeof dialogSchema>;

/* Atom */

export type DialogIdsAtom = DialogId[];

export type DialogAtom = Dialog;
export type DialogAtomParam = { id: DialogId };

/* State */

export type DialogsState = Dialog[];
