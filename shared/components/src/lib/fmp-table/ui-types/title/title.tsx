import { Typography } from '../../../typography/typography';

import type { FmpTableColumnUiTypeProps } from '../../types';
import type { TitleUiMeta } from './types';

export function Title<T>({
  column,
  value,
  record,
}: FmpTableColumnUiTypeProps<T>) {
  const uiMetaProps = (column?.uxMeta || {}) as TitleUiMeta<T>;
  const {
    titleKey,
    titleEmptyValue,
    subtitleKey,
    subtitleEmptyValue,
    titleProps = {},
    subtitleProps = {},
  } = uiMetaProps;

  let titleValue: string = titleKey ? (record[titleKey] as string) : value;
  let subtitleValue: string = subtitleKey
    ? (record[subtitleKey] as string)
    : '';

  if (
    (titleValue === undefined || titleValue === null || titleValue === '') &&
    titleEmptyValue
  ) {
    titleValue = titleEmptyValue;
  }

  if (
    (subtitleValue === undefined ||
      subtitleValue === null ||
      subtitleValue === '') &&
    subtitleEmptyValue
  ) {
    subtitleValue = subtitleEmptyValue;
  }

  return (
    <div>
      {titleValue && (
        <Typography size="small" weight="bold" {...titleProps}>
          {titleValue}
        </Typography>
      )}
      {subtitleValue && (
        <Typography size="x-small" {...subtitleProps}>
          {subtitleValue}
        </Typography>
      )}
    </div>
  );
}
