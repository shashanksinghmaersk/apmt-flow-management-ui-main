import { useTimer } from '@fes/shared-hooks';
import { useEffect } from 'react';
import { Typography } from '../../../typography/typography';

import type { FmpTableColumnUiTypeProps } from '../../types';
import type { EpochTimerUiMeta } from './types';

export function EpochTimer<T>({
  column,
  value,
  fit = 'medium',
  record,
  meta,
}: FmpTableColumnUiTypeProps<T>) {
  const isString = typeof value === 'string';
  const idKey = meta?.idKey as keyof T;
  const uiMetaProps = (column?.uxMeta || {}) as EpochTimerUiMeta;
  const { display, ...rest } = uiMetaProps;

  const { meta: timerMeta, timerStart } = useTimer({
    startAt: value,
    tickInterval: 1000,
    ...rest,
  });

  useEffect(() => {
    if (!isString && value) {
      timerStart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const values = (uiMetaProps.display || ['numericElapsed']).map(
    (key) => timerMeta[key],
  );

  const printValue = isString ? value : values.join(' ');

  return (
    <Typography
      key={`EpochTimer-${record[idKey]}${value}`}
      tag="span"
      size={fit}
    >
      {value && printValue}
    </Typography>
  );
}
