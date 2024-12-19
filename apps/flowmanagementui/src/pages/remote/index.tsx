import { FmpPage, FmpRemoteHandlingTables } from '@fes/shared-components';
import { useTranslation } from '@fes/shared-i18n';

const RemotePage = () => {
  const { t } = useTranslation();

  return (
    <FmpPage
      title={t('Remote Control')}
      subtitle={t('Get remote view of all equipments')}
    >
      <FmpRemoteHandlingTables />
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

export { RemotePage as default, getServerSideProps };
