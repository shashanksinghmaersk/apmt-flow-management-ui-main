import { useEndpoint } from '@fes/shared-api';
import {
  FmpExceptionAndonTable,
  FmpExceptionDelayTable,
  FmpPage,
  FmpTableOnRecordChangeProps,
} from '@fes/shared-components';

import { useTranslation } from '@fes/shared-i18n';
import { useAppStore, useKeycloakStore } from '@fes/shared-store';
import { useCallback } from 'react';

import type {
  ExceptionAndon,
  ExceptionAndonListRequest,
  ExceptionAndonListResponse,
  ExceptionDelay,
} from '@fes/shared-types';

const ExceptionPage = () => {
  const { t } = useTranslation();
  const { fit } = useAppStore();
  const { profile } = useKeycloakStore();

  const exceptionAndonListEndpoint = useEndpoint<
    ExceptionAndon,
    ExceptionAndon[],
    ExceptionAndonListResponse,
    ExceptionAndonListRequest
  >({
    endpoint: 'exception-andon-list',
  });

  const exceptionDelayListEndpoint = useEndpoint<
    ExceptionDelay,
    ExceptionDelay[],
    ExceptionAndonListResponse,
    ExceptionAndonListRequest
  >({
    endpoint: 'exception-error-list',
  });

  const handleExceptionAndonListRecordChange = useCallback(
    (record: ExceptionAndon) => {
      const newRecord: ExceptionAndon = {
        ...record,
        doneBy: profile?.username || null,
      };

      exceptionAndonListEndpoint.postRequest({ data: [newRecord] });
    },
    [profile?.username, exceptionAndonListEndpoint],
  );
  const handleExceptionDelayListRecordChange = useCallback(
    ({ record }: FmpTableOnRecordChangeProps<ExceptionDelay>) => {
      const newRecord: ExceptionDelay = {
        ...record,
        doneBy: profile?.username || null,
      };

      exceptionDelayListEndpoint.postRequest({ data: [newRecord] });
    },
    [profile?.username, exceptionDelayListEndpoint],
  );

  return (
    <FmpPage
      title={t('Flow Exceptions Management')}
      subtitle={t('Here you can find all your issues')}
    >
      <FmpExceptionAndonTable
        fit={fit}
        endpoint={exceptionAndonListEndpoint}
        onRecordChange={({ record }) => handleExceptionAndonListRecordChange(record)}
      />
      <FmpExceptionDelayTable
        fit={fit}
        endpoint={exceptionDelayListEndpoint}
        onRecordChange={handleExceptionDelayListRecordChange}
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

export { ExceptionPage as default, getServerSideProps };
