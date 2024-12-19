import { useState } from 'react';
import { useFmpTableFilter } from '../../hooks/use-fmp-table-filter/use-fmp-table-filter';
import { FmpTableFilterMenuItem } from '../fmp-table-filter-menu-item/fmp-table-filter-menu-item';
import { FmpTableFilterMenuRecord } from '../fmp-table-filter-menu-record/fmp-table-filter-menu-record';

import type { ApiMetaFilter } from '@fes/shared-types';
import type { FmpFilterOnChangeProps } from '../../types';

export type FmpTableFilterMenuCategoryProps = {
  filter: ApiMetaFilter;
  index: number;
  indent: number;
  className?: string;
  onChange: (props: FmpFilterOnChangeProps) => void;
};

export function FmpTableFilterMenuCategory({
  filter: _filter,
  index,
  indent,
  onChange,
}: FmpTableFilterMenuCategoryProps) {
  const [expanded, setExpanded] = useState(true);

  const { filter, handleFilterChange, handleChildChange } = useFmpTableFilter({
    filter: _filter,
    index,
    onChange,
  });

  const handleExpandedToggle = () => {
    setExpanded((state) => !state);
  };

  return (
    <>
      <FmpTableFilterMenuItem
        filter={filter}
        index={index}
        expanded={expanded}
        indent={indent}
        onChange={handleFilterChange}
        onExpandedToggle={handleExpandedToggle}
      />
      {filter.records && filter.records.length > 0 && (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
          {expanded &&
            filter.records.map((record, recordIndex) => {
              return (
                <FmpTableFilterMenuRecord
                  key={`filter-record-${index}-${record.value}`}
                  filter={record}
                  indent={indent + 1}
                  index={recordIndex}
                  onChange={handleChildChange}
                />
              );
            })}
        </>
      )}
    </>
  );
}
