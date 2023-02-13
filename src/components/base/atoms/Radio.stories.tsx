import { Radio } from '@/components/base/atoms/Radio';

import type { ComponentMeta, ComponentStoryObj } from '@storybook/react';

export default { component: Radio } satisfies ComponentMeta<typeof Radio>;

export const Default: ComponentStoryObj<typeof Radio> = {
  args: {
    name: 'radio',
    color: 'primary',
    values: [
      { label: 'Label 1', value: 'value1' },
      { label: 'Label 2', value: 'value2' },
    ],
    checked: 'value1',
  },
};
