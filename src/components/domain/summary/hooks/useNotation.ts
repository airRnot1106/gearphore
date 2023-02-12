import { useState } from 'react';

import type { SummaryNotation } from '@/stores/coordinate/types';

export const useNotation = () => {
  const [notation, setNotation] = useState<SummaryNotation>('NOTATION_57');

  return [notation, setNotation] as const;
};
