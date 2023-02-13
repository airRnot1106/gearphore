import type { SignInButtonProps } from '@/components/case/sign-in/atoms/SignInButton';
import { SignInButton } from '@/components/case/sign-in/atoms/SignInButton';

import { useTranslationContext } from '@/providers/I18nProvider';

import { useMount } from '@/hooks/useMount';

import { signOut } from '@/utils/supabase';

export type SiteSignOutButtonPresentationalProps = SignInButtonProps;

export const SiteSignInButtonPresentational = ({
  title,
  isDisabled,
  onClick,
}: SiteSignOutButtonPresentationalProps) => {
  return (
    <SignInButton title={title} isDisabled={isDisabled} onClick={onClick} />
  );
};

export const SiteSignOutButton = () => {
  const t = useTranslationContext();
  const signOutLabel = t.AUTH.SIGN_OUT;

  const handleClick = async () => {
    await signOut();
  };

  const { isMounted } = useMount();

  return (
    <SiteSignInButtonPresentational
      title={signOutLabel}
      isDisabled={!isMounted}
      onClick={handleClick}
    />
  );
};
