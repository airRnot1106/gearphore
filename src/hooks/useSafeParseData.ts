import { useCallback } from 'react';

import { useCreateLog } from '@/stores/log/operations';
import type { LogCode } from '@/stores/log/types';

import { useTranslation } from '@/hooks/useTranslation';

import type { z } from 'zod';

export const useSafeParseData = () => {
  const { t } = useTranslation();

  const createLog = useCreateLog();

  const safeParseData = useCallback(
    <T extends z.Schema>(schema: T, data: unknown) => {
      const result = schema.safeParse(data);
      if (!result.success) {
        const code: LogCode = 'INVALID_OPERATION';
        createLog({ code, message: t.ERROR[code] });
        return result.error;
      } else {
        return result.data;
      }
    },
    [createLog, t.ERROR]
  );

  return { safeParseData };
};
