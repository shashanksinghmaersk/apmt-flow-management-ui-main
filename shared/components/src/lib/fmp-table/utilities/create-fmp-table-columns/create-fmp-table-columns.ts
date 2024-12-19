import { deepmerge } from 'deepmerge-ts';
import { getUxType } from '../get-ux-type/get-ux-type';

import type {
  FmpTableColumn,
  FmpTableColumnOnChangeFn,
  FmpTableProps,
} from '../../types';

export type CreateFmpTableColumnsProps<T> = {
  columns: FmpTableColumn<T>[];
  columnDefaults?: Partial<FmpTableColumn<T>>;
  onGlobalChange?: (props: { records: T[]; id: string }) => void;
  onRecordChange: FmpTableColumnOnChangeFn<T>;
  onRecordEditStart?: () => void;
  onRecordEditEnd?: () => void;
  onRecordAction?: (
    actionId: string,
    record: T,
    value?: string | number | boolean,
  ) => void;
} & FmpTableProps<T>;

export function createFmpTableColumns<T>({
  columns: _columns,
  onGlobalChange,
  onRecordChange,
  onRecordEditStart,
  onRecordEditEnd,
  onRecordAction,
  columnDefaults = {},
}: CreateFmpTableColumnsProps<T>) {
  const columns = _columns
    .filter((column) => !column.hidden)
    .map((_column) => {
      const uxTypeConfig = getUxType<T>(_column.uxType);

      const column = deepmerge(uxTypeConfig, columnDefaults, _column, {
        onGlobalChange,
        onRecordAction,
        onRecordChange,
        onRecordEditStart,
        onRecordEditEnd,
      });

      return column as FmpTableColumn<T>;
    });

  return columns;
}
