import { ApiMetaFilter } from '@fes/shared-types';

export function setAllEnabled(_item: ApiMetaFilter, enabled: boolean) {
  const item = { ..._item, enabled };

  if (_item.records && _item.records.length > 0) {
    item.records = _item.records.map((nestedItem) =>
      setAllEnabled(nestedItem, enabled),
    );
  }

  return item;
}
