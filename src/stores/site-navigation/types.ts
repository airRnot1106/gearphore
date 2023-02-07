import { z } from 'zod';

/* Type & Schema */

export const siteNavigation = ['MY_COORDINATES', 'IMPORT', 'EXPORT'] as const;
export const siteNavigationSchema = z.enum(siteNavigation);
export type SiteNavigation = z.infer<typeof siteNavigationSchema>;

/* Atom */

export type SiteNavigationAtom = SiteNavigation;

/* State */

export type SiteNavigationState = SiteNavigation;
