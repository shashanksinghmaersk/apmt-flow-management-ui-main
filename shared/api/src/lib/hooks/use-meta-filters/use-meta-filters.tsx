import deepEqual from 'deep-equal';
import { useCallback, useEffect, useState } from 'react';
import { getFilterFromMeta } from '../../utilities/get-filter-from-meta/get-filter-from-meta';

import type { ApiMeta, ApiMetaFilter } from '@fes/shared-types';

export type UseMetaFiltersState<T> = {
  filterMap: Partial<Record<keyof T, ApiMetaFilter>>;
  filters: ApiMetaFilter[];
};

export type UseMetaFiltersProps<T> = {
  keys?: (keyof T)[];
  meta?: ApiMeta<T>;
  onFiltersChange?: (filters: ApiMetaFilter[]) => void;
};

export function useMetaFilters<T>({
  keys = [],
  meta,
  onFiltersChange,
}: UseMetaFiltersProps<T>) {
  const [state, setState] = useState<UseMetaFiltersState<T>>({
    filterMap: {},
    filters: [],
  });

  const updateState = useCallback(
    (values: Partial<UseMetaFiltersState<T>>) => {
      const oldState = { ...state };
      const newState = { ...state, ...values };

      setState(newState);

      if (!deepEqual(oldState, newState)) {
        onFiltersChange?.(newState.filters);
      }
    },
    [onFiltersChange, state],
  );

  const updateMetaFilters = useCallback(
    (map: Partial<Record<keyof T, ApiMetaFilter>>) => {
      const newFilters: ApiMetaFilter[] = [];

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      for (const [_, value] of Object.entries(map)) {
        if (value) {
          newFilters.push(value as ApiMetaFilter);
        }
      }

      return newFilters;
    },
    [],
  );

  const updateFilters = useCallback(
    (key: keyof T, _filter: ApiMetaFilter) => {
      const newFilterMap = { ...state.filterMap, [key]: _filter };
      const newFilters = updateMetaFilters(newFilterMap);

      const newState: UseMetaFiltersState<T> = {
        filterMap: newFilterMap,
        filters: newFilters,
      };

      updateState(newState);
    },
    [state.filterMap, updateMetaFilters, updateState],
  );

  useEffect(() => {
    const newFilterMap: Partial<Record<keyof T, ApiMetaFilter>> = {};

    keys.forEach((key) => {
      newFilterMap[key] = getFilterFromMeta<T>(key, meta);
    });

    const newFilters = updateMetaFilters(newFilterMap);

    updateState({ filters: newFilters, filterMap: newFilterMap });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meta]);

  return { filters: state.filters, filterMap: state.filterMap, updateFilters };
}
