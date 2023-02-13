import { SiteNavigationBarPresentational } from '@/components/domain/site/molecules/SiteNavigationBar';

import type { ComponentMeta, ComponentStoryObj } from '@storybook/react';

export default {
  component: SiteNavigationBarPresentational,
} satisfies ComponentMeta<typeof SiteNavigationBarPresentational>;

export const Default: ComponentStoryObj<
  typeof SiteNavigationBarPresentational
> = {
  args: {
    activeItem: 'MY_COORDINATES',
    children: (
      <>
        <button>マイコーデ</button>
        <button>インポート</button>
        <button>エクスポート</button>
      </>
    ),
  },
};
