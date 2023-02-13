import type { SignInButtonProps } from '@/components/case/sign-in/atoms/SignInButton';
import { SignInButton } from '@/components/case/sign-in/atoms/SignInButton';

import { useTranslationContext } from '@/providers/I18nProvider';

import { useMount } from '@/hooks/useMount';

import { signInWithGoogle } from '@/utils/supabase';

export type SiteSignInButtonPresentationalProps = SignInButtonProps;

export const SiteSignInButtonPresentational = ({
  title,
  isDisabled,
  onClick,
}: SiteSignInButtonPresentationalProps) => {
  return (
    <SignInButton title={title} isDisabled={isDisabled} onClick={onClick} />
  );
};

export const SiteSignInButton = () => {
  const t = useTranslationContext();
  const signInLabel = t.AUTH.SIGN_IN;

  const handleClick = async () => {
    await signInWithGoogle();
  };

  const { isMounted } = useMount();

  return (
    <SiteSignInButtonPresentational
      title={signInLabel}
      isDisabled={!isMounted}
      onClick={handleClick}
    />
  );
};
