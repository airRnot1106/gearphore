import { createContext, useContext, useReducer } from 'react';

import { I18N_JA } from '@/constants/translation';
import type { Locale, Translation } from '@/types';

const translationContext = createContext<Translation>(I18N_JA);

const dispatchTranslationContext = createContext<React.Dispatch<Locale>>(
  () => undefined
);

export const useTranslationContext = () => useContext(translationContext);

export const useDispatchTranslationContext = () =>
  useContext(dispatchTranslationContext);

interface I18nProviderProps {
  children: React.ReactNode;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ children }) => {
  const reducer = (_state: Translation, action: Locale) => {
    switch (action) {
      case 'ja':
        return I18N_JA;
      default:
        return I18N_JA;
    }
  };

  const [translation, dispatch] = useReducer(reducer, I18N_JA);

  return (
    <translationContext.Provider value={translation}>
      <dispatchTranslationContext.Provider value={dispatch}>
        {children}
      </dispatchTranslationContext.Provider>
    </translationContext.Provider>
  );
};
