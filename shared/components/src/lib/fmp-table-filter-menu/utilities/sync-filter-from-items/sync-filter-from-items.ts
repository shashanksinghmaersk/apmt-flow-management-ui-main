import { ApiMetaFilter } from '@fes/shared-types';

export function syncFilterFromItems(_item: ApiMetaFilter) {
  const item = { ..._item };
  const items = item.records || [];

  // Check if the array 'items' is non-empty
  if (items.length > 0) {
    // Check if all child items have the same enabled value
    const allEnabled = items.every((subItem) => subItem.enabled);
    const allDisabled = items.every((subItem) => !subItem.enabled);

    if (allEnabled) {
      item.enabled = true;
    } else if (allDisabled) {
      item.enabled = false;
    }
  }

  return item;
}
