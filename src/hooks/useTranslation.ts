import { useEffect, useState } from 'react';

import { I18N_EN, I18N_JA } from '@/constants/translation';
import type { Locale, Translation } from '@/types';

export const useTranslation = () => {
  const [translation, setTranslation] = useState<Translation>(I18N_JA);

  useEffect(() => {
    const url = window.location.href;
    const locale = url.split('/').at(-1) as Locale;
    setTranslation(locale === 'en' ? I18N_EN : I18N_JA);
  }, []);

  return { t: translation };
};
