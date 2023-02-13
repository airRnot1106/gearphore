import { useCallback } from 'react';

import { useRecoilValue } from 'recoil';

import type { ToggleInputProps } from '@/components/case/toggle/atoms/ToggleInput';
import { ToggleInput } from '@/components/case/toggle/atoms/ToggleInput';

import { useUpdateCoordinateName } from '@/stores/coordinate/operations';
import { coordinateBaseState } from '@/stores/coordinate/selectors';
import type { CoordinateId } from '@/stores/coordinate/types';

import { useTranslationContext } from '@/providers/I18nProvider';

export type CoordinateToggleInputPresentationalProps = Omit<
  ToggleInputProps,
  'size' | 'color' | 'width'
>;

export const CoordinateToggleInputPresentational = ({
  editTitle,
  value,
  onChange,
  onDelete,
}: CoordinateToggleInputPresentationalProps) => {
  return (
    <ToggleInput
      editTitle={editTitle}
      width={[80, '%']}
      size="sm"
      value={value}
      onChange={onChange}
      onDelete={onDelete}
    />
  );
};

export type CoordinateToggleInputProps = {
  coordinateId: CoordinateId;
};

export const CoordinateToggleInput = ({
  coordinateId,
}: CoordinateToggleInputProps) => {
  const { name } = useRecoilValue(coordinateBaseState({ id: coordinateId }));

  const updateCoordinateName = useUpdateCoordinateName();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      updateCoordinateName({ id: coordinateId, name: e.target.value });
    },
    [coordinateId, updateCoordinateName]
  );

  const handleDelete = useCallback(() => {
    updateCoordinateName({ id: coordinateId, name: '' });
  }, [coordinateId, updateCoordinateName]);

  const t = useTranslationContext();

  const editTitle = t.COORDINATE.CONTROL.CHANGE_NAME;

  return (
    <CoordinateToggleInputPresentational
      editTitle={editTitle}
      value={name}
      onChange={handleChange}
      onDelete={handleDelete}
    />
  );
};
