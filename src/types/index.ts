import { z } from 'zod';

import type { I18N_EN, I18N_JA } from '@/constants/translation';

import type { ReadOnlySelectorOptions } from 'recoil';

/* Utils */

export type RecoilSelectorGetter = Parameters<
  ReadOnlySelectorOptions<unknown>['get']
>['0'];

export type Entries<T extends object> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

/* Unit */

export const sizeSchema = z.enum(['xs', 'sm', 'md', 'lg']);
export type Size = z.infer<typeof sizeSchema>;

export const imageSizeSchema = z.enum(['sm', 'lg']);
export type ImageSize = z.infer<typeof imageSizeSchema>;

export const positionSchema = z.enum(['top', 'bottom', 'left', 'right']);
export type Position = z.infer<typeof positionSchema>;

export const alignSchema = z.enum(['start', 'end']);
export type Align = z.infer<typeof alignSchema>;

export const colorSchema = z.enum([
  'primary',
  'secondary',
  'accent',
  'info',
  'success',
  'warning',
  'error',
]);
export type Color = z.infer<typeof colorSchema>;

export const alertSchema = z.enum([
  'normal',
  'info',
  'success',
  'warning',
  'error',
]);
export type Alert = z.infer<typeof alertSchema>;

/* Domain */

export const localSchema = z.enum(['ja', 'en']);
export type Locale = z.infer<typeof localSchema>;
export type Translation = typeof I18N_JA | typeof I18N_EN;

export const labelValueSchema = z.object({
  label: z.string(),
  value: z.string(),
});
export type LabelValue = z.infer<typeof labelValueSchema>;
