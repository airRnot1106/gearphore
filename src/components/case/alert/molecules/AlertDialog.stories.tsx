import { AlertDialog } from '@/components/case/alert/molecules/AlertDialog';

import type { ComponentMeta, ComponentStoryObj } from '@storybook/react';

export default { component: AlertDialog } satisfies ComponentMeta<
  typeof AlertDialog
>;

export const Default: ComponentStoryObj<typeof AlertDialog> = {
  args: {
    level: 'normal',
    isShown: true,
    children: 'This is a normal alert dialog.',
  },
};
