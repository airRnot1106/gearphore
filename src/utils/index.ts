import type { Entries } from '@/types';

export const entries = <T extends object>(obj: T): Entries<T> =>
  Object.entries(obj) as Entries<T>;

export const safeParseJson = (jsonStr: string) => {
  try {
    const json = JSON.parse(jsonStr);
    return {
      success: true,
      data: json,
      error: null,
    } as const;
  } catch (e) {
    return {
      success: false,
      data: null,
      error: e,
    } as const;
  }
};
