import { z } from 'zod';

/* Type & Schema */

export const dialogIds = [
  'UNKNOWN_ERROR',
  'INVALID_OPERATION',
  'INVALID_JSON',
] as const;
export const dialogIdSchema = z.enum(dialogIds);
export type DialogId = z.infer<typeof dialogIdSchema>;

export const levels = [
  'NORMAL',
  'INFO',
  'SUCCESS',
  'WARNING',
  'ERROR',
] as const;
export const levelSchema = z.enum(levels);
export type Level = z.infer<typeof levelSchema>;

export const dialogIdToLevel = {
  UNKNOWN_ERROR: 'ERROR',
  INVALID_OPERATION: 'ERROR',
  INVALID_JSON: 'ERROR',
} as const satisfies Record<DialogId, Level>;

export const dialogIdToMs = {
  UNKNOWN_ERROR: 3000,
  INVALID_OPERATION: 3000,
  INVALID_JSON: 3000,
} as const satisfies Record<DialogId, number>;

export const dialogSchema = z.object({
  id: dialogIdSchema,
  messageParams: z.array(z.string()),
  isShown: z.boolean(),
});
export type Dialog = z.infer<typeof dialogSchema>;

/* Atom */

export type DialogAtom = Dialog;
export type DialogAtomParam = { id: DialogId };

/* State */

export type DialogState = Dialog;
export type DialogStateParam = { id: DialogId; messageParams: string[] };
