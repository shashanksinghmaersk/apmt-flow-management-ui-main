import { FmpTableColumnOnChangeProps } from './fmp-table-column-on-change-props';

export type FmpTableColumnOnChangeFn<DATA_TYPE> = (
  props: FmpTableColumnOnChangeProps<DATA_TYPE>,
) => void;
