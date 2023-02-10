import { Dropdown } from '@/components/base/molecules/Dropdown';

import type { ComponentMeta, ComponentStoryObj } from '@storybook/react';

export default { component: Dropdown } satisfies ComponentMeta<typeof Dropdown>;

export const Sample: ComponentStoryObj<typeof Dropdown> = {
  args: {
    position: 'bottom',
    align: 'start',
    label: 'Click',
    labelSize: 'md',
    children: (
      <>
        <a>複製</a>
        <a className="text-red-500">削除</a>
      </>
    ),
  },
};
