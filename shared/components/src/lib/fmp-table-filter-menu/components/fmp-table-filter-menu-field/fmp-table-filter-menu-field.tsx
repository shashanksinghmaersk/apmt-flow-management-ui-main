import { useState } from 'react';
import { useFmpTableFilter } from '../../hooks/use-fmp-table-filter/use-fmp-table-filter';
import { FmpTableFilterMenuCategory } from '../fmp-table-filter-menu-category/fmp-table-filter-menu-category';
import { FmpTableFilterMenuItem } from '../fmp-table-filter-menu-item/fmp-table-filter-menu-item';
import { FmpTableFilterMenuRecord } from '../fmp-table-filter-menu-record/fmp-table-filter-menu-record';

import type { ApiMetaFilter } from '@fes/shared-types';
import type { FmpFilterOnChangeProps } from '../../types';

import './fmp-table-filter-menu-field.scss';

export type FmpTableFilterMenuFieldProps = {
  filter: ApiMetaFilter;
  index: number;
  onChange: (props: FmpFilterOnChangeProps) => void;
};

export function FmpTableFilterMenuField({
  filter: _filter,
  index,
  onChange,
}: FmpTableFilterMenuFieldProps) {
  const [expanded, setExpanded] = useState(true);

  const { filter, handleFilterChange, handleChildChange } = useFmpTableFilter({
    filter: _filter,
    index,
    onChange,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleExpandedToggle = () => {
    setExpanded((state) => !state);
  };

  return (
    <>
      <FmpTableFilterMenuItem
        className="fmp-table-filter-menu-field__item"
        filter={filter}
        index={index}
        expanded={expanded}
        indent={0}
        onChange={handleFilterChange}
        onExpandedToggle={handleExpandedToggle}
      />
      {filter.records && (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
          {expanded &&
            filter.records.map((record, recordIndex) => {
              return record.type === 'record' ? (
                <FmpTableFilterMenuRecord
                  className="fmp-table-filter-menu-field__items-record"
                  key={`filter-field-record-${recordIndex}-${record.value}`}
                  filter={record}
                  index={recordIndex}
                  indent={1}
                  onChange={handleChildChange}
                />
              ) : (
                <FmpTableFilterMenuCategory
                  className="fmp-table-filter-menu-field__items-category"
                  key={`filter-field-category-${recordIndex}`}
                  filter={record}
                  index={recordIndex}
                  indent={1}
                  onChange={handleChildChange}
                />
              );
            })}
        </>
      )}
    </>
  );
}
