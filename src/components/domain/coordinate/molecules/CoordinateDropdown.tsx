import { useCallback } from 'react';

import { ChevronDown, Copy, FileUp, Trash2 } from 'lucide-react';
import { useRecoilValue } from 'recoil';

import type { DropdownProps } from '@/components/base/molecules/Dropdown';
import { Dropdown } from '@/components/base/molecules/Dropdown';

import { useDuplicateCoordinate } from '@/stores/coordinate/operations';
import { coordinateJsonState } from '@/stores/coordinate/selectors';
import type { CoordinateId } from '@/stores/coordinate/types';

import { useTranslationContext } from '@/providers/I18nProvider';

export type CoordinateDropdownPresentationalProps = Pick<
  DropdownProps,
  'title' | 'children'
>;

export const CoordinateDropdownPresentational = ({
  title,
  children,
}: CoordinateDropdownPresentationalProps) => {
  const Label = <ChevronDown />;

  return (
    <Dropdown
      title={title}
      label={Label}
      labelSize="xs"
      position="bottom"
      align="end"
    >
      {children}
    </Dropdown>
  );
};

export type CoordinateDropdownContainerProps = {
  coordinateId: CoordinateId;
};

export const CoordinateDropdown = ({
  coordinateId,
}: CoordinateDropdownContainerProps) => {
  const json = useRecoilValue(coordinateJsonState({ id: coordinateId }));
  const duplicateCoordinate = useDuplicateCoordinate();
  const deleteDuplicateCoordinate = useDuplicateCoordinate();

  const handleDuplicate = useCallback(() => {
    duplicateCoordinate({ id: coordinateId });
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }, [coordinateId, duplicateCoordinate]);

  const handleExport = useCallback(() => {
    navigator.clipboard.writeText(json);
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }, [json]);

  const handleDelete = useCallback(() => {
    deleteDuplicateCoordinate({ id: coordinateId });
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }, [coordinateId, deleteDuplicateCoordinate]);

  const t = useTranslationContext();
  const title = t.COORDINATE.CONTROL.DROPDOWN.LABEL;
  const duplicateLabel = t.COORDINATE.CONTROL.DROPDOWN.DUPLICATE;
  const exportLabel = t.COORDINATE.CONTROL.DROPDOWN.EXPORT;
  const deleteLabel = t.COORDINATE.CONTROL.DROPDOWN.DELETE;

  return (
    <CoordinateDropdownPresentational title={title}>
      <>
        <button onClick={handleDuplicate}>
          <Copy />
          <span>{duplicateLabel}</span>
        </button>
        <button onClick={handleExport}>
          <FileUp />
          <span>{exportLabel}</span>
        </button>
        <button className="text-error" onClick={handleDelete}>
          <Trash2 />
          <span>{deleteLabel}</span>
        </button>
      </>
    </CoordinateDropdownPresentational>
  );
};
