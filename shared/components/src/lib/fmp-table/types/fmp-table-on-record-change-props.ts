import type { FmpTableColumn } from './fmp-table-column';

export type FmpTableOnRecordChangeProps<DATA_TYPE> = {
  record: DATA_TYPE;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  column: FmpTableColumn<DATA_TYPE>;
};
