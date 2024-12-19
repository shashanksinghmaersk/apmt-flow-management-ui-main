import type { ApiMetaFilter } from '@fes/shared-types';

export function getFilterCounts(filter?: ApiMetaFilter) {
  let count = 0;
  let maxCount = 0;

  const traverse = (filter: ApiMetaFilter) => {
    if (filter.type === 'record') {
      maxCount += 1;
      if (filter.enabled) {
        count += 1;
      }
    }

    if (
      filter.type === 'field' &&
      (!filter.records || filter.records.length === 0)
    ) {
      maxCount += 1;
      if (filter.enabled) {
        count += 1;
      }
    }

    if (filter.records && filter.records.length > 0) {
      filter.records.forEach(traverse);
    }
  };

  if (filter) {
    traverse(filter);
  }

  return { count, maxCount };
}
