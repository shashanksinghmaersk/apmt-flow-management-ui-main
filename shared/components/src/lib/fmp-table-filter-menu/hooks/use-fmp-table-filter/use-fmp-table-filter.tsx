import { useCallback, useState } from 'react';
import { setAllEnabled } from '../../utilities/set-all-enabled/set-all-enabled';
import { syncFilterFromItems } from '../../utilities/sync-filter-from-items/sync-filter-from-items';

import type { ApiMetaFilter } from '@fes/shared-types';
import { useDeepCompareEffect } from 'rooks';
import type { FmpFilterOnChangeProps } from '../../types';

export type UseFmpTableFilterProps = {
  filter?: ApiMetaFilter;
  index?: number;
  onChange?: (props: FmpFilterOnChangeProps) => void;
};

export const useFmpTableFilter = ({
  filter: _filter,
  index,
  onChange,
}: UseFmpTableFilterProps) => {
  const [filter, setFilter] = useState<ApiMetaFilter>({
    ...(_filter || {
      enabled: true,
      type: 'category',
      key: 'root',
    }),
  });

  const handleFilterChange = useCallback(
    ({ item }: FmpFilterOnChangeProps) => {
      const newFilter = setAllEnabled(item, item.enabled);

      setFilter((current) => ({ ...current, ...newFilter }));

      onChange?.({ index, item: newFilter });
    },
    [index, onChange, setFilter],
  );

  const handleChildChange = useCallback(
    ({ item, index: _index }: FmpFilterOnChangeProps) => {
      let newFilter = { ...filter };

      if (newFilter.records && newFilter.records.length > 0) {
        newFilter.records[_index || 0] = item;
      }

      // If the parent is not enabled and a child is enabled, enable the parent
      if (!newFilter.enabled && item.enabled) {
        newFilter.enabled = true;
      }

      // Sync the filter from the items without enabling/disabling all children
      newFilter = syncFilterFromItems(newFilter);

      setFilter((current) => ({ ...current, ...newFilter }));
      onChange?.({ index, item: newFilter });
    },
    [filter, index, onChange, setFilter],
  );

  const updateFilter = useCallback(
    (updatedFilter: ApiMetaFilter) => {
      setFilter((current) => ({ ...current, ...updatedFilter }));
      onChange?.({ index, item: updatedFilter });
    },
    [index, onChange, setFilter],
  );

  useDeepCompareEffect(() => {
    const newFilter = { ...filter, ..._filter };

    setFilter(newFilter);

    /*
    onChange?.({
      index,
      item: newFilter,
    });
    */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_filter]);

  return {
    filter,
    updateFilter,
    handleFilterChange,
    handleChildChange,
  };
};
