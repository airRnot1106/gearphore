import { useCallback } from 'react';

import type { AddButtonProps } from '@/components/case/add/atoms/AddButton';
import { AddButton } from '@/components/case/add/atoms/AddButton';

import { useCreateCoordinate } from '@/stores/coordinate/operations';

import { useTranslationContext } from '@/providers/I18nProvider';

import { useMount } from '@/hooks/useMount';

type CoordinateAddButtonPresentationalProps = Pick<
  AddButtonProps,
  'title' | 'isDisabled' | 'onClick'
>;

export const CoordinateAddButtonPresentational = ({
  title,
  isDisabled,
  onClick,
}: CoordinateAddButtonPresentationalProps) => {
  return (
    <AddButton
      title={title}
      shape="circle"
      decorations={['shadow']}
      isDisabled={isDisabled}
      onClick={onClick}
    />
  );
};

export const CoordinateAddButton = () => {
  const createCoordinate = useCreateCoordinate();

  const handleClick = useCallback(() => {
    createCoordinate();
  }, [createCoordinate]);

  const t = useTranslationContext();
  const title = t.COORDINATE.CONTROL.ADD_COORDINATE;

  const { isMounted } = useMount();

  return (
    <CoordinateAddButtonPresentational
      title={title}
      isDisabled={!isMounted}
      onClick={handleClick}
    />
  );
};
