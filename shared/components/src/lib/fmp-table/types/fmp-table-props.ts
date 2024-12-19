import { McTable } from '@maersk-global/mds-react-wrapper';

import type { ApiMeta, ThemeFit } from '@fes/shared-types';
import type { ReactNode } from 'react';
import type { FmpTableColumn } from './fmp-table-column';
import type { FmpTableOnGlobalChange } from './fmp-table-on-global-change';
import type { FmpTableOnRecordAction } from './fmp-table-on-record-action';
import type { FmpTableOnRecordChangeFn } from './fmp-table-on-record-change-fn';

export type FmpTableProps<DATA_TYPE> = {
  checkedRecords?: DATA_TYPE[];
  children?: ReactNode;
  className?: string;
  columnDefaults?: Partial<FmpTableColumn<DATA_TYPE>>;
  columns?: FmpTableColumn<DATA_TYPE>[];
  data?: DATA_TYPE[];
  dataKey: keyof DATA_TYPE;
  fit?: ThemeFit;
  flashNewColumns?: boolean;
  flashUpdatedColumns?: boolean;
  hidden?: boolean;
  id?: string;
  loading?: boolean;
  loadingError?: boolean;
  meta?: ApiMeta<DATA_TYPE>;
  tableProps?: React.ComponentProps<typeof McTable>;
  updating?: boolean;
  onGlobalChange?: FmpTableOnGlobalChange<DATA_TYPE>;
  onRecordAction?: FmpTableOnRecordAction<DATA_TYPE>;
  onRecordChange?: FmpTableOnRecordChangeFn<DATA_TYPE>;
  onRecordEditEnd?: () => void;
  onRecordEditStart?: () => void;
};
