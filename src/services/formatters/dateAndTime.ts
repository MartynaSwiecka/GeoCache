import { DateTime } from 'luxon';

export const formatDateTime = (
  timeISOString: string,
  format = 'HH:mm',
): string => DateTime.fromISO(timeISOString).toFormat(format);
