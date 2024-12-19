import { McTooltip } from '@maersk-global/mds-react-wrapper';
import cx from 'classnames';
import { Typography } from '../../../typography/typography';
import * as UiTypes from '../../ui-types/index';

import type { ApiMeta, ThemeFit } from '@fes/shared-types';
import type { ReactNode } from 'react';
import type { FmpTableColumn } from '../../types';

import './fmp-table-custom-cells.scss';

export type FmpTableCustomCellsProps<T> = {
  newRowIds?: T[keyof T][];
  data?: T[];
  dataKey?: keyof T;
  columns?: FmpTableColumn<T>[];
  meta?: ApiMeta<T>;
  className?: string;
  fit?: ThemeFit;
  model?: Partial<
    Record<
      keyof T | string,
      {
        column: FmpTableColumn<T>;
      }
    >
  >;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const FmpTableCustomCells = <T extends Record<string, any>>({
  data,
  columns = [],
  model = {},
  meta,
  fit,
  dataKey = '',
  className,
  newRowIds,
}: FmpTableCustomCellsProps<T>) => {
  return (
    data &&
    data.map((record: T, index: number) => {
      const CellNodes: Record<string, ReactNode> = {};

      for (const [key, value] of Object.entries(model)) {
        if (value) {
          const column = value.column;
          let disabled = !!column?.disabled;
          const render = column?.render;
          const outerRender = column?.outerRender;
          const uiType = column?.uiType;

          if (typeof column?.disabled === 'string') {
            try {
              // we have access - we dont need to be sneaky with eval to make things go bad
              // eslint-disable-next-line no-eval
              const evaluation = eval(column.disabled) as boolean;
              disabled = !!evaluation;
              // eslint-disable-next-line no-empty
            } catch (err) {}
          }

          if (!CellNodes[key]) {
            let recordValue = record[column.id];
            const recordHasValue =
              recordValue !== undefined &&
              recordValue !== null &&
              recordValue !== '';

            if (!recordHasValue) {
              recordValue = column.emptyValue || recordValue;
            }

            let returnResult: ReactNode = (
              <Typography type="text" size={fit}>
                {recordValue}
              </Typography>
            );

            if (render) {
              returnResult = render({
                record,
                data,
                meta,
                columns,
                column,
                value: recordValue,
                disabled,
                fit,
                newRowIds,
              });
            } else if (uiType) {
              try {
                const UiComponent = UiTypes[uiType];

                returnResult = (
                  <UiComponent
                    record={record}
                    data={data}
                    meta={meta}
                    columns={columns}
                    column={column}
                    value={recordValue}
                    disabled={disabled}
                    fit={fit}
                    newRowIds={newRowIds}
                  />
                );
                // eslint-disable-next-line no-empty
              } catch (err) {}
            }

            const classNames = cx(
              className,
              'fmp-table-cell fmp-table-custom-cells',
              {
                'fmp-table-custom-cells--disabled': disabled,
                [`fmp-table-custom-cells--${fit}`]: true,
              },
            );

            const InnerResult = outerRender
              ? outerRender({
                  column,
                  columns,
                  data,
                  meta,
                  record,
                  disabled,
                  value,
                  fit,
                  children: returnResult,
                })
              : returnResult;

            CellNodes[key] = (
              <div
                key={`fmp-table-cell-${record[dataKey]}-${key}-${index}`}
                className={classNames}
                slot={`${record[dataKey]}_${key}`}
              >
                {column.tooltip ? (
                  <McTooltip position="top-center">
                    <span slot="trigger">{InnerResult}</span>
                    <div>{column.tooltip}</div>
                  </McTooltip>
                ) : (
                  InnerResult
                )}
              </div>
            );
          }
        }
      }

      const CellNodeArray: ReactNode[] = [];

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      for (const [_, value] of Object.entries(CellNodes)) {
        CellNodeArray.push(value);
      }

      return CellNodeArray;
    })
  );
};
