import { z } from 'zod';

/* Type & Schema */

export const logIdSchema = z.string();
export type LogId = z.infer<typeof logIdSchema>;

export const logCodes = [
  'NOT_INITIALIZED_LOG',
  'INVALID_OPERATION',
  'INVALID_JSON',
] as const;
export const logCodeSchema = z.enum(logCodes);
export type LogCode = z.infer<typeof logCodeSchema>;

export const logLevels = ['ERROR', 'WARN', 'INFO', 'DEBUG'] as const;
export const logLevelSchema = z.enum(logLevels);
export type LogLevel = z.infer<typeof logLevelSchema>;

export const logCodeToLogLevel = {
  NOT_INITIALIZED_LOG: 'ERROR',
  INVALID_OPERATION: 'ERROR',
  INVALID_JSON: 'ERROR',
} as const satisfies Record<LogCode, LogLevel>;

export const logSchema = z.object({
  id: logIdSchema,
  code: logCodeSchema,
  level: logLevelSchema,
  message: z.string().optional(),
  isProcessed: z.boolean(),
});
export type Log = z.infer<typeof logSchema>;

/* Atom */

export type LogIdsAtom = LogId[];

export type LogAtom = Log;
export type LogAtomParam = Pick<Log, 'id'>;

/* State */

export type LogIdsState = LogId[];

export type LogState = Log;
export type LogStateParam = Pick<Log, 'id'>;
