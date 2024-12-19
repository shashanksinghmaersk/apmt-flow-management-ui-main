import type { ThemeFit } from '@fes/shared-types';
import type { FmpTableColumnRenderProps } from './fmp-table-column-render-props';

export type FmpTableColumnUiTypeProps<DATA_TYPE> = {
  fit?: ThemeFit;
  width?: string | number;
} & FmpTableColumnRenderProps<DATA_TYPE>;
