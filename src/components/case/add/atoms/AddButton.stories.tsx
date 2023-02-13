import { AddButton } from '@/components/case/add/atoms/AddButton';

import type { ComponentMeta, ComponentStoryObj } from '@storybook/react';

export default { component: AddButton } satisfies ComponentMeta<
  typeof AddButton
>;

export const Default: ComponentStoryObj<typeof AddButton> = {
  args: {
    title: '追加する',
    htmlFor: 'add',
    size: 'md',
    decorations: ['shadow'],
  },
};
