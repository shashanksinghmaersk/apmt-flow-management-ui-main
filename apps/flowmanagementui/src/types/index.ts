export type EnvConstants = {
  nodeEnv: string;
  apiBaseUrl: string;
  apiBaseUrlWs: string;
  remoteBaseUrl: string;
};

export type KeycloakConfig = {
  url: string;
  realm: string;
  clientId: string;
};

export type AppInitialProps = {
  keycloakConfig?: KeycloakConfig;
  env?: EnvConstants;
  cookie?: unknown;
};
