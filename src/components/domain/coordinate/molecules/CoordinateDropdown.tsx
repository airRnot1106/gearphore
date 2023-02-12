import { useCallback } from 'react';

import { ChevronDown, Copy, FileUp, Trash2 } from 'lucide-react';
import { useRecoilValue } from 'recoil';

import type { DropdownProps } from '@/components/base/molecules/Dropdown';
import { Dropdown } from '@/components/base/molecules/Dropdown';

import {
  useDeleteCoordinate,
  useDuplicateCoordinate,
} from '@/stores/coordinate/operations';
import {
  coordinateBaseState,
  coordinateJsonState,
} from '@/stores/coordinate/selectors';
import type { CoordinateId } from '@/stores/coordinate/types';
import { useCreateDialog } from '@/stores/dialog/operations';

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
  const t = useTranslationContext();
  const title = t.COORDINATE.CONTROL.DROPDOWN.LABEL;
  const duplicateLabel = t.COORDINATE.CONTROL.DROPDOWN.DUPLICATE;
  const exportLabel = t.COORDINATE.CONTROL.DROPDOWN.EXPORT;
  const deleteLabel = t.COORDINATE.CONTROL.DROPDOWN.DELETE;
  const exportMessage = t.COPY.DIALOG.SUCCESS;
  const deleteMessage = t.COORDINATE.DIALOG.DELETE;

  const json = useRecoilValue(coordinateJsonState({ id: coordinateId }));
  const duplicateCoordinate = useDuplicateCoordinate();
  const deleteCoordinate = useDeleteCoordinate();

  const { name } = useRecoilValue(coordinateBaseState({ id: coordinateId }));
  const createDialog = useCreateDialog();

  const handleDuplicate = useCallback(() => {
    duplicateCoordinate({ id: coordinateId });
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }, [coordinateId, duplicateCoordinate]);

  const handleExport = useCallback(async () => {
    await navigator.clipboard.writeText(json);
    createDialog({ level: 'success', message: exportMessage });
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }, [json, createDialog, exportMessage]);

  const handleDelete = useCallback(() => {
    deleteCoordinate({ id: coordinateId });
    createDialog({
      level: 'info',
      message: deleteMessage.replace('{s}', name),
    });
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }, [deleteCoordinate, coordinateId, createDialog, deleteMessage, name]);

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
