import { useTranslation } from '@fes/shared-i18n';
import { McButtonGroup, McButtonGroupItem } from '@maersk-global/mds-react-wrapper';
import { useCallback, useState } from 'react';
import { FmpFilterButton } from '../../fmp-filter-button/fmp-filter-button';
import { FmpTableFilterMenu } from '../../fmp-table-filter-menu/fmp-table-filter-menu';

import type { ApiMetaFilter, TaktCardViewType, ThemeFit } from '@fes/shared-types';

export function getActiveFilterCount(filters?: ApiMetaFilter[]) {
  let activeFilters = 0;

  filters?.forEach((filter) => {
    if (filter.records && filter.records.length > 0) {
      filter.records.forEach((item) => {
        if (item.enabled) {
          activeFilters += 1;
        }
      });
    } else {
      activeFilters += 1;
    }
  });

  return activeFilters;
}

export type FmpTaktHeaderActionState = {
  filter?: ApiMetaFilter;
  count?: number;
};

export type FmpTaktHeaderActionProps = {
  fit?: ThemeFit;
  viewType?: TaktCardViewType;
  filters?: ApiMetaFilter[];
  onViewChange?: (type: TaktCardViewType) => void;
  onFiltersChange?: (filters: ApiMetaFilter[]) => void;
};

export const FmpTaktHeaderAction = ({
  onViewChange,
  viewType,
  fit,
  filters: _filters,
}: FmpTaktHeaderActionProps) => {
  const { t } = useTranslation();

  const [state, setState] = useState<FmpTaktHeaderActionState>({
    filter: {
      enabled: true,
      key: 'root',
      type: 'field',
      label: t('All'),
      records: _filters,
    },
    count: getActiveFilterCount(_filters),
  });

  const handleViewChange = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (e: any) => {
      onViewChange?.(e.detail.item.__value);
    },
    [onViewChange],
  );

  const handleFilterChange = useCallback((newFilter: ApiMetaFilter) => {
    const count = getActiveFilterCount(newFilter.records);

    setState({ filter: newFilter, count });
  }, []);

  return (
    <>
      <div>
        <McButtonGroup fit={fit} selectiontype="single" listchange={handleViewChange}>
          <McButtonGroupItem
            selected={viewType === 'list-view'}
            value="list-view"
            label="List"
            icon="list-bullets"
          />
          <McButtonGroupItem
            selected={viewType === 'flow-view'}
            value="flow-view"
            label="FlowViz"
            icon="rotate"
          />
        </McButtonGroup>
      </div>
      {!!state.filter?.records?.length && (
        <FmpFilterButton fit={fit} count={0} maxCount={0} label={t('Filter')}>
          <FmpTableFilterMenu filter={state.filter} onChange={handleFilterChange} />
        </FmpFilterButton>
      )}
    </>
  );
};
