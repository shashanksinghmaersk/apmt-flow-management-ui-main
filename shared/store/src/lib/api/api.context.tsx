import { createContext, useContext } from 'react';

import type { KeycloakProfile } from 'keycloak-js';
import type { NotificationProps } from '@fes/shared-types';

export type ApiContextKeycloakType = {
  authenticated?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user?: any;
  profile?: KeycloakProfile;
  token?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tokenParsed?: any;
};

export type ApiContextType = {
  apiBaseUrl?: string;
  apiBaseUrlWs?: string;
  remoteBaseUrl?: string;
  token?: string;
  keycloak?: ApiContextKeycloakType;
  notify?: (props: NotificationProps) => void;
  logout?: () => void;
  updateApiStore?: (values: ApiContextValue) => void;
};

export type ApiContextValue = Partial<Omit<ApiContextType, 'updateApiStore'>>;

export const ApiContext = createContext<ApiContextType>({});

export const useApiStore = () => useContext(ApiContext);
