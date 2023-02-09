import { Plus } from 'lucide-react';

import type { ButtonProps } from '@/components/base/atoms/Button';
import { Button } from '@/components/base/atoms/Button';

export type AddButtonProps = Omit<ButtonProps, 'children'>;

export const AddButton = ({
  title,
  htmlFor,
  size,
  color,
  shape,
  decorations,
  isDisabled,
  onClick,
}: AddButtonProps) => {
  const iconSize = (() => {
    switch (size) {
      case 'xs':
        return 16;
      case 'sm':
        return 24;
      case 'md':
        return 32;
      case 'lg':
        return 40;
      default:
        return 32;
    }
  })();

  return (
    <Button
      title={title}
      htmlFor={htmlFor}
      size={size}
      color={color}
      shape={shape}
      decorations={decorations}
      isDisabled={isDisabled}
      onClick={onClick}
    >
      <Plus size={iconSize} />
    </Button>
  );
};
