import { McTooltip } from '@maersk-global/mds-react-wrapper';
import { Typography } from '../../../typography/typography';
import cx from 'classnames';

import type { FmpTableColumnUiTypeProps } from '../../types';
import type { TextUiMeta } from './types';

export function Text<T>({
  column,
  value,
  width,
  fit = 'medium',
  disabled,
}: FmpTableColumnUiTypeProps<T>) {
  const uiMetaProps = (column?.uxMeta || {}) as TextUiMeta;
  const { tooltip, ...rest } = uiMetaProps;
  const classNames = cx('text-value', {
    'text-value--disabled': !!disabled,
  });

  return tooltip && !disabled ? (
    <McTooltip>
      <div className={classNames} style={{ width }} slot="trigger">
        <Typography
          className="text-value__text"
          tag="span"
          size={fit}
          {...rest}
        >
          {value}
        </Typography>
      </div>
      <span>{value}</span>
    </McTooltip>
  ) : (
    <Typography tag="span" size={fit} {...rest}>
      {value}
    </Typography>
  );
}
