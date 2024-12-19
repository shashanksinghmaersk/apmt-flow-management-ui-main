import cx from 'classnames';
import { FmpTableFilterMenuItem } from '../fmp-table-filter-menu-item/fmp-table-filter-menu-item';

import type { ApiMetaFilter } from '@fes/shared-types';
import type { FmpFilterOnChangeProps } from '../../types';

type FmpTableFilterMenuRecordProps = {
  className?: string;
  filter: ApiMetaFilter;
  index: number;
  indent: number;
  onChange: (props: FmpFilterOnChangeProps) => void;
};

export function FmpTableFilterMenuRecord({
  filter,
  index,
  indent,
  className,
  onChange,
}: FmpTableFilterMenuRecordProps) {
  const classNames = cx(className, 'fmp-table-filter-menu-record');

  return (
    <FmpTableFilterMenuItem
      className={classNames}
      filter={filter}
      index={index}
      indent={indent}
      onChange={onChange}
    />
  );
}
