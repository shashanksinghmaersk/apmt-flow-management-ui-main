import { FmpTableColumn } from './fmp-table-column';

export type FmpTableColumnOnChangeProps<DATA_TYPE> = {
  column: FmpTableColumn<DATA_TYPE>;
  record: DATA_TYPE;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
};
