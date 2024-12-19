import type { TableColumn } from '@maersk-global/mds-components-core/mc-table/types';
import type { FmpTableColumnUxType } from './fmp-table-column-ux-type';
import type { FmpTableColumnUiType } from './fmp-table-column-ui-type';
import type { FmpTableColumnUxMeta } from './fmp-table-column-ux-meta';
import type { FmpTableOnGlobalChange } from './fmp-table-on-global-change';
import type { FmpTableColumnOnChangeFn } from './fmp-table-column-on-change-fn';
import type { FmpTableOnRecordAction } from './fmp-table-on-record-action';
import type { FmpTableColumnRenderFn } from './fmp-table-column-render-fn';
import type { FmpTableColumnOuterRenderFn } from './fmp-table-column-outer-render-fn';

export type FmpTableColumn<DATA_TYPE> = {
  disabled?: boolean | string;
  emptyValue?: string;
  global?: boolean;
  hidden?: boolean;
  tooltip?: string;
  uiType?: FmpTableColumnUiType;
  uxMeta?: FmpTableColumnUxMeta;
  uxType?: FmpTableColumnUxType;
  render?: FmpTableColumnRenderFn<DATA_TYPE>;
  outerRender?: FmpTableColumnOuterRenderFn<DATA_TYPE>;
  // Used internally by the table only
  onGlobalChange?: FmpTableOnGlobalChange<DATA_TYPE>;
  onRecordAction?: FmpTableOnRecordAction<DATA_TYPE>;
  onRecordChange?: FmpTableColumnOnChangeFn<DATA_TYPE>;
  onRecordEditStart?: () => void;
  onRecordEditEnd?: () => void;
} & TableColumn;
