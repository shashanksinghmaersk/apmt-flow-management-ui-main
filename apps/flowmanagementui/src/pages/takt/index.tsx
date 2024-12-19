import { useEndpoint } from '@fes/shared-api';
import {
  FmpPage,
  FmpPageGrid,
  FmpTaktCard,
  FmpTaktHeaderAction,
  FmpTrafficBufferPanel,
} from '@fes/shared-components';
import { useTranslation } from '@fes/shared-i18n';
import { useAppStore } from '@fes/shared-store';
import { useCallback, useState } from 'react';

import type {
  Takt,
  TaktCardViewType,
  TaktListRequest,
  TaktListResponse,
} from '@fes/shared-types';
import { useDidMount } from 'rooks';

const TaktPage = () => {
  const { t } = useTranslation();
  const { fit } = useAppStore();
  const [viewType, setViewType] = useState<TaktCardViewType>('list-view');

  const { data, meta, getRequest } = useEndpoint<
    Takt,
    Takt[],
    TaktListResponse,
    TaktListRequest
  >({
    endpoint: 'takt-list',
  });

  const handleViewChange = useCallback(
    (value: TaktCardViewType) => {
      setViewType(value);
    },
    [setViewType],
  );

  useDidMount(() => {
    getRequest();
  });

  return (
    <FmpPage
      className="fmp-page-takt"
      title={t('TAKT Management Board')}
      subtitle={t('Monitor real time progress and dependencies')}
      Action={
        <FmpTaktHeaderAction
          fit={fit}
          onViewChange={handleViewChange}
          viewType={viewType}
          filters={meta?.filters}
        />
      }
    >
      <FmpPageGrid
        fit={fit}
        breakpoints={[0, 980, 1400, 2000]}
        layout={[1, 2, 3, 4]}
      >
        {data?.map((dataItem) => (
          <FmpTaktCard
            viewType={viewType}
            key={dataItem.id}
            className="fmp-page-takt__card"
            data={dataItem}
            fit={fit}
          />
        ))}
      </FmpPageGrid>
      <FmpTrafficBufferPanel />
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

export { TaktPage as default, getServerSideProps };
