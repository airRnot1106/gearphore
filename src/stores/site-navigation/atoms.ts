import { atom } from 'recoil';

import type { SiteNavigationAtom } from '@/stores/site-navigation/types';

export const siteNavigationAtom = atom<SiteNavigationAtom>({
  key: 'siteNavigationAtom',
  default: 'MY_COORDINATES',
});
