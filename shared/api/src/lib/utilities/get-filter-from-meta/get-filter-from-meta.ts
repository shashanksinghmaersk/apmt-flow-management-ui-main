import { ApiMetaFilter, ApiMeta } from '@fes/shared-types';

export const getFilterFromMeta = <T>(key: keyof T, meta?: ApiMeta<T>) => {
  let filter: ApiMetaFilter | undefined;
  const filters = meta?.filters || [];

  filters.forEach((_filter) => {
    if (_filter.key === key) {
      filter = _filter;
    }
  });

  return filter;
};
