import type { FmpTableOnRecordChangeProps } from './fmp-table-on-record-change-props';

export type FmpTableOnRecordChangeFn<DATA_TYPE> = (
  props: FmpTableOnRecordChangeProps<DATA_TYPE>,
) => void;
