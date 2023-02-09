import { Children, cloneElement, useCallback } from 'react';

import { FileUp, Import, Shirt } from 'lucide-react';
import { useRecoilValue } from 'recoil';

import { useSwitchSiteNavigation } from '@/stores/site-navigation/operations';
import { siteNavigationState } from '@/stores/site-navigation/selectors';
import type { SiteNavigation } from '@/stores/site-navigation/types';
import { siteNavigation } from '@/stores/site-navigation/types';

import { useTranslationContext } from '@/providers/I18nProvider';

interface SiteNavigationBarPresentationalProps {
  activeItem: SiteNavigation;
  children: React.ReactElement;
}

export const SiteNavigationBarPresentational = ({
  activeItem,
  children,
}: SiteNavigationBarPresentationalProps) => {
  const mappedChildren = Children.map(
    children.props.children,
    (child, index) => {
      if (index === siteNavigation.indexOf(activeItem)) {
        return cloneElement(child, {
          className: `${child.props.className} active`,
        });
      } else {
        return child;
      }
    }
  );

  return <div className="btm-nav">{mappedChildren}</div>;
};

export const SiteNavigationBar = () => {
  const activeItem = useRecoilValue(siteNavigationState);
  const switchSiteNavigation = useSwitchSiteNavigation();

  const handleClick = useCallback(
    (item: SiteNavigation) => () => {
      switchSiteNavigation(item);
    },
    [switchSiteNavigation]
  );

  const t = useTranslationContext();

  const Icon = (item: SiteNavigation) => {
    switch (item) {
      case 'MY_COORDINATES':
        return <Shirt />;
      case 'IMPORT':
        return <Import />;
      case 'EXPORT':
        return <FileUp />;
    }
  };

  return (
    <SiteNavigationBarPresentational activeItem={activeItem}>
      <>
        {siteNavigation.map((item) => (
          <button
            key={item}
            className="text-accent"
            onClick={handleClick(item)}
          >
            <div className="flex items-center space-x-3">
              {Icon(item)}
              <span className="hidden md:inline">{t.NAVIGATION[item]}</span>
            </div>
          </button>
        ))}
      </>
    </SiteNavigationBarPresentational>
  );
};
