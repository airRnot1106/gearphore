'use client';

import { useEffect } from 'react';

import { useDispatchTranslationContext } from '@/providers/I18nProvider';

import type { Locale } from '@/types';

export default function Home({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  const dispatchTranslation = useDispatchTranslationContext();

  useEffect(() => {
    dispatchTranslation(locale);
  }, [dispatchTranslation, locale]);

  return (
    <main className="p-5">
      <h1 className="text-5xl font-bold">Next-Template-V2</h1>
    </main>
  );
}
