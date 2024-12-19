import { McIcon } from '@maersk-global/mds-react-wrapper';

import type { FmpTableColumnUiTypeProps } from '../../types';
import type { IconUiMeta } from './types';

export function Icon<T>({
  column,
  value,
  fit = 'medium',
}: FmpTableColumnUiTypeProps<T>) {
  const uiMetaProps = (column?.uxMeta || {}) as IconUiMeta;
  const { map = {}, ...rest } = uiMetaProps;

  let icon: string = map[value] || '';

  if (map['*'] && !icon) {
    icon = map['*'];
  }

  let size: '16' | '20' | '24' = '20';

  switch (fit) {
    case 'small':
      size = '16';
      break;
    case 'medium':
      size = '20';
      break;
    case 'large':
      size = '24';
      break;
    default:
      break;
  }

  return <McIcon icon={icon} size={size} {...rest} />;
}
