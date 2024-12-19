import cx from 'classnames';
import { FmpTableFilterMenuField } from './components/fmp-table-filter-menu-field/fmp-table-filter-menu-field';
import { useFmpTableFilter } from './hooks/use-fmp-table-filter/use-fmp-table-filter';

import type { ApiMetaFilter, ThemeFit } from '@fes/shared-types';

import './fmp-table-filter-menu.scss';

export type FmpTableFilterMenuProps = {
  className?: string;
  fit?: ThemeFit;
  filter?: ApiMetaFilter;
  filters?: ApiMetaFilter[];
  onChange?: (filter: ApiMetaFilter) => void;
};

const rootFilter: ApiMetaFilter = {
  enabled: true,
  type: 'category',
  key: 'root',
};

export function FmpTableFilterMenu({
  className,
  fit,
  filters: _filters,
  filter: _filter,
  onChange,
}: FmpTableFilterMenuProps) {
  const { filter, handleChildChange } = useFmpTableFilter({
    filter: _filter || { ...rootFilter, records: _filters },
    onChange: ({ item }) => onChange?.(item),
  });

  const classNames = cx(className, 'fmp-table-filter-menu', {
    'fmp-table-filter-menu--mobile': fit === 'small',
  });

  return (
    <div className={classNames}>
      {filter.records?.map((filter, index) => {
        return (
          <FmpTableFilterMenuField
            key={`filter-field-${index}`}
            index={index}
            filter={filter}
            onChange={handleChildChange}
          />
        );
      })}
    </div>
  );
}
