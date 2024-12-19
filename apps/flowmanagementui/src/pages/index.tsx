import { Typography } from '@fes/shared-components';
import { useTranslation } from '@fes/shared-i18n';
import { McButton } from '@maersk-global/mds-react-wrapper';
import Link from 'next/link';

const Index = () => {
  const { t } = useTranslation();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        maxWidth: 680,
        margin: '0 auto',
      }}
    >
      <Typography
        type="headline"
        size="small"
        weak
        style={{ textAlign: 'center', marginBottom: 8 }}
      >
        {t('Welcome to the Flow Management Board')}
      </Typography>
      <Typography
        type="text"
        size="medium"
        weak
        style={{ marginBottom: 24, textAlign: 'center' }}
      >
        {t(
          'Duis laborum exercitation et elit id consequat eu deserunt. Ullamco occaecat Lorem ad commodo reprehenderit officia ipsum anim consequat.',
        )}
      </Typography>
      <Link href="/takt">
        <McButton icon="crane" label={t('Enter The Board')} />
      </Link>
    </div>
  );
};

const getServerSideProps = () => {
  return {
    props: {
      keycloakConfig: {
        url: process.env.NEXT_PUBLIC_KEYCLOAK_AUTH_URL || '',
        realm: process.env.NEXT_PUBLIC_KEYCLOAK_REALM || '',
        clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID || '',
      },
      nodeEnv: process.env.NODE_ENV || '',
      apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || '',
      apiBaseUrlWs: process.env.NEXT_PUBLIC_API_BASE_WS_URL || '',
      remoteBaseUrl: process.env.NEXT_PUBLIC_REMOTE_BASE_URL || '',
    },
  };
};

export { Index as default, getServerSideProps };
