import type { ApiMeta, ThemeFit } from '@fes/shared-types';
import type { FmpTableColumn } from './fmp-table-column';

export type FmpTableColumnRenderProps<DATA_TYPE> = {
  record: DATA_TYPE;
  data: DATA_TYPE[];
  meta?: ApiMeta<DATA_TYPE>;
  columns: FmpTableColumn<DATA_TYPE>[];
  column: FmpTableColumn<DATA_TYPE>;
  fit?: ThemeFit;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: any;
  disabled?: boolean;
  newRowIds?: (string | number)[];
};
