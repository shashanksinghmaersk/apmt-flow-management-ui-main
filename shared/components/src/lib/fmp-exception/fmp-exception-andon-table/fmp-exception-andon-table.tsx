import { useTranslation } from '@fes/shared-i18n';
import { McButton } from '@maersk-global/mds-react-wrapper';
import { Suspense, useMemo, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { FmpTableColumnConfig, createFmpTableRowBackground } from '../../fmp-table';
import { FmpTableCard, FmpTableCardProps } from '../../fmp-table-card/fmp-table-card';
import { fmpExceptionAndonColumns } from './fmp-exception-andon-columns';

import type { ExceptionAndon, ExceptionAndonListRequest } from '@fes/shared-types';

import './fmp-exception-andon-table.scss';

export type FmpExceptionAndonTableProps = Pick<
  FmpTableCardProps<ExceptionAndon, ExceptionAndonListRequest>,
  'endpoint' | 'onRecordChange' | 'fit'
>;

export function FmpExceptionAndonTable(props: FmpExceptionAndonTableProps) {
  const { t } = useTranslation();

  const [columns, setColumns] = useState(fmpExceptionAndonColumns);
  const _columns = fmpExceptionAndonColumns.map((c) => c.id);

  const [selectedColumns, setSelectedColumns] = useLocalStorage(
    'fmp-exception-andon-table',
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
    <div className="fmp-exception-andon-table">
      <Suspense fallback={<div>Loading...</div>}>
        <FmpTableCard
          {...props}
          flashNewColumns
          pagination
          className="fmp-exception-andon-table__table"
          dataKey="exceptionId"
          icon="exclamation-triangle"
          columns={columns}
          title={t('Ops & Tech Andons')}
          columnDefaults={{
            disabled: 'record.investigation === "Closed" && record.hardClosed',
          }}
          filters={[
            { key: 'che', label: 'Che' },
            { key: 'type', label: 'Type' },
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
                label={t('Download')}
              />
              <FmpTableColumnConfig
                columns={fmpExceptionAndonColumns}
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
