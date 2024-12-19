import { McButton } from '@maersk-global/mds-react-wrapper';
import { Suspense, useMemo, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { FmpTableColumnConfig, createFmpTableRowBackground } from '../../fmp-table';
import { FmpTableCard, FmpTableCardProps } from '../../fmp-table-card/fmp-table-card';
import { fmpExceptionDelayColumns } from './fmp-exception-delay-columns';

import type { ExceptionDelay, ExceptionDelayListRequest } from '@fes/shared-types';

import './fmp-exception-delay-table.scss';

export type FmpExceptionDelayTableProps = Pick<
  FmpTableCardProps<ExceptionDelay, ExceptionDelayListRequest>,
  'endpoint' | 'onRecordChange' | 'fit'
>;

export function FmpExceptionDelayTable(props: FmpExceptionDelayTableProps) {
  const [columns, setColumns] = useState(fmpExceptionDelayColumns);
  const _columns = fmpExceptionDelayColumns.map((c) => c.id);

  const [selectedColumns, setSelectedColumns] = useLocalStorage(
    'fmp-exception-delay-table',
    _columns,
  );

  const rows = useMemo(
    () =>
      props.endpoint?.data
        ?.map((record, index) => (record.andonStatus === 'Open' ? index : undefined))
        .filter((n) => n !== undefined) || [],
    [props.endpoint?.data],
  );

  const customstyles = createFmpTableRowBackground(rows.map(Number), 'error');

  return (
    <div className="fmp-exception-delay-table">
      <Suspense fallback={<div>Loading...</div>}>
        <FmpTableCard
          {...props}
          flashNewColumns
          pagination
          className="fmp-exception-delay-table__table"
          dataKey="exceptionId"
          icon="exclamation-triangle"
          columns={columns}
          title="Flow Delays"
          columnDefaults={{
            disabled: 'record.investigation === "Closed" && record.hardClosed',
          }}
          filters={[
            { key: 'che', label: 'Che' },
            { key: 'investigation', label: 'Investigation Status' },
            { key: 'time', label: 'Last 24 Hours' },
          ]}
          tableProps={{ customstyles }}
          UtilityArea={
            <>
              <McButton
                fit={props.fit}
                icon="file-csv"
                variant="outlined"
                appearance="neutral"
                label="Download"
              />
              <FmpTableColumnConfig
                columns={fmpExceptionDelayColumns}
                meta={props.endpoint?.meta}
                selected={selectedColumns}
                onChangeColumns={(newColumns) => setColumns(newColumns)}
                onChangeSelected={(selectedColumns) =>
                  setSelectedColumns(selectedColumns)
                }
              />
            </>
          }
        />
      </Suspense>
    </div>
  );
}
