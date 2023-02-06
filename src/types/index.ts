import type { I18N_EN, I18N_JA } from '@/constants/translation';

/* Utils */

/* Unit */

/* Domain */

export type Locale = 'ja' | 'en';

export type Translation = typeof I18N_JA | typeof I18N_EN;
