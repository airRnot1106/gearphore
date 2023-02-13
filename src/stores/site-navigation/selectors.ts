import { selector } from 'recoil';

import { siteNavigationAtom } from '@/stores/site-navigation/atoms';
import type { SiteNavigationState } from '@/stores/site-navigation/types';

export const siteNavigationState = selector<SiteNavigationState>({
  key: 'siteNavigationState',
  get: ({ get }) => {
    return get(siteNavigationAtom);
  },
});
