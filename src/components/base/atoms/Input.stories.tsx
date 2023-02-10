import { Input } from '@/components/base/atoms/Input';

import type { ComponentMeta, ComponentStoryObj } from '@storybook/react';

export default { component: Input } satisfies ComponentMeta<typeof Input>;

export const Default: ComponentStoryObj<typeof Input> = {
  args: {
    decorations: ['bordered'],
    value: 'テキスト',
  },
};
