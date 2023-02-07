import { z } from 'zod';

/* Type & Schema */

export const dialogIds = ['UNKNOWN_ERROR'] as const;
export const dialogIdSchema = z.enum(dialogIds);
export type DialogId = z.infer<typeof dialogIdSchema>;

export const dialogIdToMs = {
  UNKNOWN_ERROR: 3000,
} as const satisfies Record<DialogId, number>;

export const dialogSchema = z.object({
  id: dialogIdSchema,
  content: z.string().optional(),
  isShown: z.boolean(),
});
export type Dialog = z.infer<typeof dialogSchema>;

/* Atom */

export type DialogAtom = Dialog;
export type DialogAtomParam = Pick<Dialog, 'id'>;

/* State */

export type DialogState = Dialog;
export type DialogStateParam = Pick<Dialog, 'id'>;
