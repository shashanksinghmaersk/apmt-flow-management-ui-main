import { useEndpoint } from '@fes/shared-api';
import {
  FmpInsightsDetails,
  FmpInsightsDeviation,
  FmpInsightsDeviationFilter,
  FmpInsightsTable,
  FmpPage,
  FmpPageGrid,
} from '@fes/shared-components';
import { useTranslation } from '@fes/shared-i18n';
import { useAppStore } from '@fes/shared-store';
import { useCallback, useState } from 'react';

import type {
  InsightAlert,
  InsightAlertListRequest,
  InsightAlertListResponse,
  InsightDetail,
  InsightDetailRequest,
  InsightDetailResponse,
} from '@fes/shared-types';

const filters: FmpInsightsDeviationFilter[] = [
  { label: '15m', value: 15 * 1000 * 60 },
  { label: '30m', value: 30 * 1000 * 60 },
  { label: '1h', value: 60 * 1000 * 60 },
  { label: '2h', value: 120 * 1000 * 60 },
  { label: '4h', value: 240 * 1000 * 60 },
];

const InsightsPage = () => {
  const { t } = useTranslation();
  const { fit } = useAppStore();

  const [activeFilter, setActiveFilter] = useState<FmpInsightsDeviationFilter>(
    filters[0],
  );

  const insightAlertListEndpoint = useEndpoint<
    InsightAlert,
    InsightAlert[],
    InsightAlertListResponse,
    InsightAlertListRequest
  >({
    endpoint: 'insight-alert-list',
  });

  const { data: insightDetailsData, getRequest: insightDetailsDataGet } =
    useEndpoint<
      InsightDetail,
      InsightDetail,
      InsightDetailResponse,
      InsightDetailRequest
    >({
      endpoint: 'insight-detail',
    });

  const handleFiltersChange = useCallback(
    (filter: FmpInsightsDeviationFilter) => {
      setActiveFilter(filter);
    },
    [],
  );

  const handleInsightsTableRowClick = useCallback(
    async (exceptionId: string) => {
      if (exceptionId) {
        const request = {
          request: { exceptionId },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any;

        insightDetailsDataGet(request);
      }
    },
    [insightDetailsDataGet],
  );

  return (
    <FmpPage title={t('Insights')} subtitle={t('Here you can find insights')}>
      <FmpPageGrid layout={[1]}>
        <FmpInsightsDeviation
          fit={fit}
          active={activeFilter}
          filters={filters}
          onFiltersChange={handleFiltersChange}
        />
        <FmpInsightsTable
          fit={fit}
          endpoint={insightAlertListEndpoint}
          onRowClick={handleInsightsTableRowClick}
        />
        <FmpInsightsDetails details={insightDetailsData} />
      </FmpPageGrid>
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

export { InsightsPage as default, getServerSideProps };
