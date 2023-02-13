'use client';

import { useEffect } from 'react';

import { useRecoilValue } from 'recoil';

import { AlertDialog } from '@/components/case/alert/molecules/AlertDialog';

import { useCleanupDialog } from '@/stores/dialog/operations';
import { dialogsState } from '@/stores/dialog/selectors';
import type { Dialog } from '@/stores/dialog/types';

export type SiteAlertDialogPresentationalProps = {
  dialogs: Dialog[];
};

export const SiteAlertDialogPresentational = ({
  dialogs,
}: SiteAlertDialogPresentationalProps) => {
  return (
    <div className="fixed inset-x-0 top-32 m-auto">
      <div className="flex flex-col">
        {dialogs.map(({ id, level, message, isShown }) => (
          <AlertDialog key={id} level={level} isShown={isShown}>
            {message}
          </AlertDialog>
        ))}
      </div>
    </div>
  );
};

export const SiteAlertDialog = () => {
  const dialogs = useRecoilValue(dialogsState);
  const cleanupDialog = useCleanupDialog();

  useEffect(() => {
    const intervalId = setInterval(() => {
      cleanupDialog();
    }, 10000);
    return () => clearInterval(intervalId);
  }, [cleanupDialog]);

  return <SiteAlertDialogPresentational dialogs={dialogs} />;
};
