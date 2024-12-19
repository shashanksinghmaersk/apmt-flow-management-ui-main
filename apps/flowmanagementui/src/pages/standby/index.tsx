import { nullifyData, useEndpoint } from '@fes/shared-api';
import { FmpPage, FmpStandbyPinningTable } from '@fes/shared-components';
import { useTranslation } from '@fes/shared-i18n';
import { useAppStore, useKeycloakStore } from '@fes/shared-store';
import {
  StandbyPinning,
  StandbyPinningListRequest,
  StandbyPinningListResponse,
} from '@fes/shared-types';
import { useCallback } from 'react';
import { useDidMount } from 'rooks';

import type { FmpTableOnRecordChangeProps } from '@fes/shared-components';

const StandbyPage = () => {
  const { t } = useTranslation();
  const { fit } = useAppStore();
  const { profile } = useKeycloakStore();

  const endpoint = useEndpoint<
    StandbyPinning,
    StandbyPinning[],
    StandbyPinningListResponse,
    StandbyPinningListRequest
  >({
    endpoint: 'standby-pinning-list',
  });

  const handleStandbyPinningRecordChange = useCallback(
    ({ record }: FmpTableOnRecordChangeProps<StandbyPinning>) => {
      endpoint.postRequest({
        data: [{ ...record, createdBy: profile?.username || null }],
      });
    },
    [endpoint, profile?.username],
  );

  const handleStandbyPinningRecordAction = useCallback(
    (id: string, record: StandbyPinning) => {
      if (id === 'ACTION_DELETE') {
        const _nullifiedRecords = nullifyData({
          data: [record],
          omit: ['quayCraneShortName', 'vesselName', 'createdBy', 'craneMode'],
        });

        const nullifiedRecords = _nullifiedRecords.map((record) => {
          return { ...record, createdBy: profile?.username };
        }) as StandbyPinning[];

        endpoint.postRequest({ data: nullifiedRecords });
      }
    },
    [endpoint, profile?.username],
  );

  const handleDeleteRecordsClick = useCallback(
    (records: StandbyPinning[]) => {
      endpoint.postRequest({ data: records });
    },
    [endpoint],
  );

  useDidMount(() => {
    endpoint.getRequest();
  });

  return (
    <FmpPage
      title={t('Standby & Pinning Stations')}
      subtitle={t('Select Pinning, Standby and driving directions')}
    >
      <FmpStandbyPinningTable
        fit={fit}
        profile={profile}
        endpoint={endpoint}
        onRecordChange={handleStandbyPinningRecordChange}
        onRecordAction={handleStandbyPinningRecordAction}
        onDeleteRecordsClick={handleDeleteRecordsClick}
      />
    </FmpPage>
  );
};

const getServerSideProps = async () => {
  return {
    props: {
      keycloakConfig: {
        url: process.env.NEXT_PUBLIC_KEYCLOAK_AUTH_URL || '',
        realm: process.env.NEXT_PUBLIC_KEYCLOAK_REALM || '',
        clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID || '',
      },
      env: {
        nodeEnv: process.env.NODE_ENV || '',
        apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || '',
        apiBaseUrlWs: process.env.NEXT_PUBLIC_API_BASE_WS_URL || '',
        remoteBaseUrl: process.env.NEXT_PUBLIC_REMOTE_BASE_URL || '',
      },
    },
  };
};

export { StandbyPage as default, getServerSideProps };
