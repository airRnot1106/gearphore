/* Operation */

import { useRecoilCallback } from 'recoil';

import { siteNavigationAtom } from '@/stores/site-navigation/atoms';
import type { SiteNavigation } from '@/stores/site-navigation/types';
import { siteNavigationSchema } from '@/stores/site-navigation/types';

import type { CallbackInterface } from 'recoil';

const switchSiteNavigation = (
  callback: CallbackInterface,
  newState: SiteNavigation
) => {
  const { set } = callback;
  set(siteNavigationAtom, newState);
};

/* Hook */

export const useSwitchSiteNavigation = () => {
  return useRecoilCallback((callback) => (newState: SiteNavigation) => {
    const result = siteNavigationSchema.safeParse(newState);
    if (!result.success) return;
    const { data } = result;
    switchSiteNavigation(callback, data);
  });
};
