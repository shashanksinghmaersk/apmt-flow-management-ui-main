import { FmpTag } from '../../../fmp-tag/fmp-tag';

import type { ThemeAppearance } from '@fes/shared-types';
import type { FmpTableColumnUiTypeProps } from '../../types';
import type { TagUiMeta } from './types';

export function Tag<T>({
  column,
  value,
  fit = 'medium',
}: FmpTableColumnUiTypeProps<T>) {
  const uiMetaProps = (column?.uxMeta || {}) as TagUiMeta;
  let appearance: ThemeAppearance = uiMetaProps[value];

  if (uiMetaProps['*'] && !appearance) {
    appearance = uiMetaProps['*'];
  }

  return (
    <FmpTag fit={fit} appearance={appearance}>
      {value}
    </FmpTag>
  );
}
