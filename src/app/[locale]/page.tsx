'use client';

import { useEffect } from 'react';

import { useRecoilValue } from 'recoil';

import { Export } from '@/components/page/Export';
import { Import } from '@/components/page/Import';
import { MyCoordinates } from '@/components/page/MyCoordinates';

import { siteNavigationState } from '@/stores/site-navigation/selectors';

import { useDispatchTranslationContext } from '@/providers/I18nProvider';

import type { Locale } from '@/types';

export default function Home({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  const siteNavigation = useRecoilValue(siteNavigationState);

  const Page = (() => {
    switch (siteNavigation) {
      case 'MY_COORDINATES':
        return <MyCoordinates />;
      case 'IMPORT':
        return <Import />;
      case 'EXPORT':
        return <Export />;
    }
  })();

  const dispatchTranslation = useDispatchTranslationContext();

  useEffect(() => {
    dispatchTranslation(locale);
  }, [dispatchTranslation, locale]);

  return <main className="p-5">{Page}</main>;
}
