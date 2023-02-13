import { Button } from '@/components/base/atoms/Button';

import type { ComponentMeta, ComponentStoryObj } from '@storybook/react';

export default { component: Button } satisfies ComponentMeta<typeof Button>;

export const Default: ComponentStoryObj<typeof Button> = {
  args: {
    title: 'ボタン',
    htmlFor: 'button',
    size: 'md',
    color: 'primary',
    shape: 'square',
    decorations: ['ghost', 'outline', 'glass', 'no-animation', 'wide', 'block'],
    isDisabled: false,
    children: 'ボタン',
  },
};
