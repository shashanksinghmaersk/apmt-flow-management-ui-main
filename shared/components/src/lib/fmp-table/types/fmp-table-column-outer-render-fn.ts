import type { ReactNode } from 'react';
import type { FmpTableColumnRenderProps } from './fmp-table-column-render-props';

export type FmpTableColumnOuterRenderFn<DATA_TYPE> = (
  props: FmpTableColumnRenderProps<DATA_TYPE> & { children: ReactNode },
) => ReactNode;
