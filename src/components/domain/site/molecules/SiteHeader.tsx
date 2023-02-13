import { useRecoilValue } from 'recoil';

import { SiteSignInButton } from '@/components/domain/site/atoms/SiteSignInButton';
import { SiteSignOutButton } from '@/components/domain/site/atoms/SiteSignOutButton';

import { userState } from '@/stores/user/selectors';

import { useTranslationContext } from '@/providers/I18nProvider';

type SiteHeaderPresentationalProps = {
  logotype: string;
};

export const SiteHeaderPresentational = ({
  logotype,
}: SiteHeaderPresentationalProps) => {
  const user = useRecoilValue(userState);

  return (
    <header className="h-full">
      <div className="flex h-full items-center justify-between p-5">
        <div className="flex items-center">
          <h1 className="select-none text-2xl font-bold text-primary md:text-4xl">
            {logotype}
          </h1>
        </div>
        <div className="flex items-center">
          {user ? <SiteSignOutButton /> : <SiteSignInButton />}
        </div>
      </div>
    </header>
  );
};

export const SiteHeader = () => {
  const t = useTranslationContext();
  const logotype = t.BASE.TITLE;
  return <SiteHeaderPresentational logotype={logotype} />;
};
