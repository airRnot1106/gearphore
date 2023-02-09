/* Operation */

import { useRecoilCallback } from 'recoil';

import { siteNavigationAtom } from '@/stores/site-navigation/atoms';
import type { SiteNavigation } from '@/stores/site-navigation/types';
import { siteNavigationSchema } from '@/stores/site-navigation/types';

import { useSafeParseData } from '@/hooks/useSafeParse';

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
  const { safeParseData } = useSafeParseData();

  return useRecoilCallback((callback) => (newState: SiteNavigation) => {
    const result = safeParseData(siteNavigationSchema, newState);
    if (!result.success) return;
    switchSiteNavigation(callback, result.data);
  });
};
