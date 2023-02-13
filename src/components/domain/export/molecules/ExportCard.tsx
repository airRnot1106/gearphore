import { useRecoilValue } from 'recoil';

import { CopyButton } from '@/components/case/copy/CopyButton';

import { coordinateAllJsonState } from '@/stores/coordinate/selectors';
import { useCreateDialog } from '@/stores/dialog/operations';

import { useTranslationContext } from '@/providers/I18nProvider';

export type ExportCardPresentationalProps = {
  exportLabel: string;
  copyLabel: string;
  json: string;
  onClick: () => void;
};

export const ExportCardPresentational = ({
  exportLabel,
  copyLabel,
  json,
  onClick,
}: ExportCardPresentationalProps) => {
  return (
    <div className="space-y-1 rounded-3xl bg-neutral p-5 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] ">
      <div className="flex h-[60dvh] flex-col space-y-5">
        <p className="text-xl font-bold">{exportLabel}</p>
        <textarea
          className="textarea h-[80dvh]"
          readOnly
          value={json}
        ></textarea>
        <div className="self-end">
          <CopyButton title={copyLabel} size="sm" onClick={onClick} />
        </div>
      </div>
    </div>
  );
};

export const ExportCard = () => {
  const json = useRecoilValue(coordinateAllJsonState);

  const createDialog = useCreateDialog();

  const t = useTranslationContext();
  const exportLabel = t.NAVIGATION.EXPORT;
  const copyLabel = t.COPY.LABEL;

  const exportMessage = t.COPY.DIALOG.SUCCESS;

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(json);
    createDialog({ level: 'success', message: exportMessage });
  };

  return (
    <ExportCardPresentational
      exportLabel={exportLabel}
      copyLabel={copyLabel}
      json={json}
      onClick={copyToClipboard}
    />
  );
};
