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

export const sizeSchema = z.enum(['xs', 'sm', 'md', 'lg']).optional();
export type Size = z.infer<typeof sizeSchema>;

export const imageSizeSchema = z.enum(['sm', 'lg']).optional();
export type ImageSize = z.infer<typeof imageSizeSchema>;

export const positionSchema = z
  .enum(['top', 'bottom', 'left', 'right'])
  .optional();
export type Position = z.infer<typeof positionSchema>;

export const alignSchema = z.enum(['start', 'end']).optional();
export type Align = z.infer<typeof alignSchema>;

export const colorSchema = z
  .enum([
    'primary',
    'secondary',
    'accent',
    'info',
    'success',
    'warning',
    'error',
  ])
  .optional();
export type Color = z.infer<typeof colorSchema>;

export const alertSchema = z.enum([
  'normal',
  'info',
  'success',
  'warning',
  'error',
]);
export type Alert = z.infer<typeof alertSchema>;

export const shapeSchema = z.enum(['square', 'circle']).optional();
export type Shape = z.infer<typeof shapeSchema>;

const cssLSDSchema = z.union([
  z.literal('l'),
  z.literal('s'),
  z.literal('d'),
  z.literal(''),
]);
type CssLSD = z.infer<typeof cssLSDSchema>;

export const cssCommonUnitSchema = z.union([
  z.literal('px'),
  z.literal('em'),
  z.literal('ex'),
  z.literal('ch'),
  z.literal('rem'),
  z.literal('lh'),
  z.custom<`${CssLSD}vmin`>((val) => /^[lsd]?vmin$/.test(val as string)),
  z.custom<`${CssLSD}vmax`>((val) => /^[lsd]?vmax$/.test(val as string)),
  z.literal('%'),
]);
export type CssCommonUnit = z.infer<typeof cssCommonUnitSchema>;

export const cssWidthUnit = z.union([
  cssCommonUnitSchema,
  z.custom<`${CssLSD}vw`>((val) => /^[lsd]?vw$/.test(val as string)),
]);
export type CssWidthUnit = z.infer<typeof cssWidthUnit>;

export const cssHeightUnit = z.union([
  cssCommonUnitSchema,
  z.custom<`${CssLSD}vh`>((val) => /^[lsd]?vh$/.test(val as string)),
]);
export type CssHeightUnit = z.infer<typeof cssHeightUnit>;

export const cssSizeUnit = z.union([cssWidthUnit, cssHeightUnit]);
export type CssSizeUnit = z.infer<typeof cssSizeUnit>;

export const cssWidth = z.tuple([z.number(), cssWidthUnit]);
export type CssWidth = z.infer<typeof cssWidth>;

export const cssHeight = z.tuple([z.number(), cssHeightUnit]);
export type CssHeight = z.infer<typeof cssHeight>;

export const cssSize = z.tuple([z.number(), cssSizeUnit]);
export type CssSize = z.infer<typeof cssSize>;

/* Domain */

export const localSchema = z.enum(['ja', 'en']);
export type Locale = z.infer<typeof localSchema>;
export type Translation = typeof I18N_JA | typeof I18N_EN;

export const labelValueSchema = z.object({
  label: z.string(),
  value: z.string(),
});
export type LabelValue = z.infer<typeof labelValueSchema>;
