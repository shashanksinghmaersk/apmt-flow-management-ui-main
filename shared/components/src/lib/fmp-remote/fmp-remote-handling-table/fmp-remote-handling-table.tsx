import { useTranslation } from '@fes/shared-i18n';
import { useApiStore, useAppStore } from '@fes/shared-store';
import { McTag } from '@maersk-global/mds-react-wrapper';
import cx from 'classnames';
import { useCallback } from 'react';
import { FmpTableCard } from '../../fmp-table-card/fmp-table-card';
import { fmpRemoteHandlingTableColumnsMap } from './fmp-remote-handling-table-columns-map';

import type { RemoteHandlingItem, RemoteHandlingKey } from '@fes/shared-types';

export type FmpRemoteHandlingTableProps = {
  data: RemoteHandlingItem[];
  itemKey: RemoteHandlingKey;
};

export const FmpRemoteHandlingTable = ({
  itemKey,
  data = [],
}: FmpRemoteHandlingTableProps) => {
  const { t } = useTranslation();
  const { fit } = useAppStore();
  const { remoteBaseUrl } = useApiStore();

  const availableCount = data.filter((item) => item.cheStatus === 'Available').length;

  const unavailableCount = data.filter((item) => item.cheStatus === 'Unavailable').length;

  const totalCount = data.length;
  const icon = cx({
    crane: itemKey === 'QCs',
    'rubber-tyred-gantry-crane': itemKey === 'RTGs',
    'container-handler-2': itemKey === 'EHs',
    'truck-side': itemKey === 'TTs',
  });

  const handleRecordAction = useCallback(
    (_: string, record: RemoteHandlingItem) => {
      const title = record.cheShortName;
      const width = 1280;
      const height = 768;
      const features = `width=${width},height=${height},resizable=yes,scrollbars=no,toolbar=no,menubar=no,location=no,status=no`;

      window.open(`${remoteBaseUrl}/${record.url}`, title, features);
    },
    [remoteBaseUrl],
  );

  return (
    <FmpTableCard
      className="fmp-remote-handling-table"
      collapsible
      title={itemKey}
      icon={icon}
      fit={fit}
      data={data}
      dataKey="cheShortName"
      columns={fmpRemoteHandlingTableColumnsMap[itemKey]}
      onRecordAction={handleRecordAction}
      UtilityArea={
        <>
          <McTag
            label={`${t('Available')} ${availableCount} (${totalCount})`}
            appearance="success"
          />
          <McTag
            label={`${t('Unavailable')} ${unavailableCount} (${totalCount})`}
            appearance="error"
          />
        </>
      }
    />
  );
};
