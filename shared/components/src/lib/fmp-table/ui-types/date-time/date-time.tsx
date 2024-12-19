import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { Typography } from '../../../typography/typography';

import type { Locale } from 'date-fns/locale';
import type { FmpTableColumnUiTypeProps } from '../../types';
import type { DateTimeUiMeta } from './types';

import './date-time.scss';

// Define a shared type for the configuration object
interface FormatOptions {
  timestamp: number;
  format?: string;
  locale?: Locale;
}

/**
 * Returns the formatted date string (month and day of month) in a readable format.
 * @param options - The options object containing timestamp, format string, and locale.
 * @returns A formatted date string.
 */
function formatDate(options: FormatOptions) {
  const { timestamp, format: dateFormat = 'd MMMM', locale = enUS } = options;
  return format(new Date(timestamp * 1000), dateFormat, { locale });
}

/**
 * Returns the formatted time string (hours, minutes, and seconds).
 * @param options - The options object containing timestamp, format string, and locale.
 * @returns A formatted time string.
 */
function formatTime(options: FormatOptions) {
  const { timestamp, format: timeFormat = 'HH:mm:ss', locale = enUS } = options;
  return format(new Date(timestamp * 1000), timeFormat, { locale });
}

/**
 * Returns the formatted year string.
 * @param options - The options object containing timestamp, format string, and locale.
 * @returns A formatted year string.
 */
function formatYear(options: FormatOptions) {
  const { timestamp, format: yearFormat = 'yyyy', locale = enUS } = options;
  return format(new Date(timestamp * 1000), yearFormat, { locale });
}

export function DateTime<T>({ column, value }: FmpTableColumnUiTypeProps<T>) {
  const uxMetaDefault: DateTimeUiMeta = {
    title: ['date'],
    subtitle: ['time'],
    timeFormat: 'HH:mm:ss',
    dateFormat: 'd MMMM',
    yearFormat: 'yyyy',
  };

  const uxMeta = column?.uxMeta || ({} as DateTimeUiMeta);

  const yearString = formatYear({
    timestamp: value,
    format: uxMeta.yearFormat || uxMetaDefault.yearFormat,
  });
  const dateString = formatDate({
    timestamp: value,
    format: uxMeta.dateFormat || uxMetaDefault.dateFormat,
  });
  const timeString = formatTime({
    timestamp: value,
    format: uxMeta.timeFormat || uxMetaDefault.timeFormat,
  });

  let titleString = '';
  let subtitleString = '';

  const titles = (uxMeta.title || uxMetaDefault.title) as string[];
  const subtitles = (uxMeta.subtitle || uxMetaDefault.subtitle) as string[];

  titles?.forEach((item) => {
    switch (item) {
      case 'year':
        titleString = `${titleString} ${yearString}`;
        break;
      case 'date':
        titleString = `${titleString} ${dateString}`;
        break;
      case 'time':
        titleString = `${titleString} ${timeString}`;
        break;
      default:
        break;
    }
  });

  subtitles?.forEach((item) => {
    switch (item) {
      case 'year':
        subtitleString = `${subtitleString} ${yearString}`;
        break;
      case 'date':
        subtitleString = `${subtitleString} ${dateString}`;
        break;
      case 'time':
        subtitleString = `${subtitleString} ${timeString}`;
        break;
      default:
        break;
    }
  });

  return (
    <div className="fmp-table-uitype-date-time">
      <Typography className="fmp-table-uitype-date-time__title">
        {titleString}
      </Typography>
      <Typography
        className="fmp-table-uitype-date-time__subtitle"
        size="x-small"
        weak
      >
        {subtitleString}
      </Typography>
    </div>
  );
}
