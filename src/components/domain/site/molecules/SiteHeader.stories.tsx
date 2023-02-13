import { SiteHeaderPresentational } from '@/components/domain/site/molecules/SiteHeader';

import type { ComponentMeta, ComponentStoryObj } from '@storybook/react';

export default { component: SiteHeaderPresentational } satisfies ComponentMeta<
  typeof SiteHeaderPresentational
>;

export const Default: ComponentStoryObj<typeof SiteHeaderPresentational> = {
  args: {
    logotype: 'Next-Template-V2',
  },
};
