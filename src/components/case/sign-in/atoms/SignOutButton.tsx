import { LogOut } from 'lucide-react';

import type { ButtonProps } from '@/components/base/atoms/Button';
import { Button } from '@/components/base/atoms/Button';

export type SignOutButtonProps = Pick<
  ButtonProps,
  'title' | 'isDisabled' | 'onClick'
>;

export const SignOutButton = ({
  title,
  isDisabled,
  onClick,
}: SignOutButtonProps) => {
  return (
    <Button
      title={title}
      color="secondary"
      shape="square"
      decorations={['block']}
      isDisabled={isDisabled}
      onClick={onClick}
    >
      <span className="flex items-center space-x-2 px-3">
        <LogOut />
        <span>{title}</span>
      </span>
    </Button>
  );
};
