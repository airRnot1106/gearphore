import { ImportButton } from '@/components/case/import/atoms/ImportButton';
import { useImport } from '@/components/domain/import/hooks/useImport';

import { useImportCoordinatesArrayFromJson } from '@/stores/coordinate/operations';
import { useCreateDialog } from '@/stores/dialog/operations';

import { useTranslationContext } from '@/providers/I18nProvider';

export type ImportCardPresentationalProps = {
  titleLabel: string;
  importLabel: string;
  json: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onClick: () => void;
};

export const ImportCardPresentational = ({
  titleLabel,
  importLabel,
  json,
  onChange,
  onClick,
}: ImportCardPresentationalProps) => {
  return (
    <div className="space-y-1 rounded-3xl bg-neutral p-5 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] ">
      <div className="flex h-[60dvh] flex-col space-y-5">
        <p className="text-xl font-bold">{titleLabel}</p>
        <textarea
          className="textarea h-[80dvh]"
          value={json}
          onChange={onChange}
        ></textarea>
        <div className="self-end">
          <ImportButton title={importLabel} size="sm" onClick={onClick} />
        </div>
      </div>
    </div>
  );
};

export const ImportCard = () => {
  const importCoordinatesArrayFromJson = useImportCoordinatesArrayFromJson();

  const createDialog = useCreateDialog();

  const t = useTranslationContext();
  const titleLabel = t.NAVIGATION.IMPORT;
  const importLabel = t.IMPORT.LABEL;

  const importSuccessMessage = t.IMPORT.DIALOG.SUCCESS;
  const importErrorMessage = t.IMPORT.DIALOG.ERROR;

  const { importData, handleChange } = useImport();

  const handleClick = () => {
    const result = importCoordinatesArrayFromJson(importData);
    if (result) {
      createDialog({ level: 'success', message: importSuccessMessage });
    } else {
      createDialog({ level: 'error', message: importErrorMessage });
    }
  };

  return (
    <ImportCardPresentational
      titleLabel={titleLabel}
      importLabel={importLabel}
      json={importData}
      onChange={handleChange}
      onClick={handleClick}
    />
  );
};
