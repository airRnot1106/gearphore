import { AlertCircle, CheckCircle2, Info, XCircle } from 'lucide-react';

import type { Level } from '@/types';

export type AlertDialogProps = {
  level: Level;
  isShown: boolean;
  children: React.ReactNode;
};

export const AlertDialog = ({ level, isShown, children }: AlertDialogProps) => {
  const mark = (() => {
    switch (level) {
      case 'info':
        return <Info />;
      case 'success':
        return <CheckCircle2 />;
      case 'warning':
        return <AlertCircle />;
      case 'error':
        return <XCircle />;
      default:
        return null;
    }
  })();

  return (
    <div
      className={
        'alert fixed inset-x-0 top-24 m-auto w-fit animate-pulsate-fwd shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] ' +
        (level === 'info' ? 'alert-info ' : '') +
        (level === 'success' ? 'alert-success ' : '') +
        (level === 'warning' ? 'alert-warning ' : '') +
        (level === 'error' ? 'alert-error ' : '') +
        (isShown ? '' : 'hidden ')
      }
    >
      <div>
        {mark}
        {children}
      </div>
    </div>
  );
};
