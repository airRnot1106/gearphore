import { z } from 'zod';

/* Type & Schema */

export const animationKeys = ['SLIDE_IN_LEFT'] as const;
export const animationKeySchema = z.enum(animationKeys);
export type AnimationKey = z.infer<typeof animationKeySchema>;

export const animationKeyToMs = {
  SLIDE_IN_LEFT: 1000,
} as const satisfies Record<AnimationKey, number>;

export const animationSchema = z.object({
  id: z.string(),
  animations: z.object({
    SLIDE_IN_LEFT: z.boolean(),
  } satisfies Record<AnimationKey, z.ZodBoolean>),
});
export type Animation = z.infer<typeof animationSchema>;

/* Atom */

export type AnimationAtom = boolean;
export type AnimationAtomParam = {
  id: string;
  animationKey: AnimationKey;
};

/* State */

export type AnimationState = Animation;
export type AnimationStateParam = { id: string };
