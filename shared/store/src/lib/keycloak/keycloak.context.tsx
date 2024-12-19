import { createContext, useContext } from 'react';

import type { KeycloakProfile } from 'keycloak-js';
import type { NotificationProps } from '@fes/shared-types';

export type KeycloakContextType = {
  authenticated?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user?: any;
  profile?: KeycloakProfile;
  token?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tokenParsed?: any;
  notify?: (props: NotificationProps) => void;
  logout?: () => void;
  updateKeycloakStore?: (values: KeycloakContextValue) => void;
};

export type KeycloakContextValue = Partial<
  Omit<KeycloakContextType, 'updateKeycloakStore'>
>;

export const KeycloakContext = createContext<KeycloakContextType>({});

export const useKeycloakStore = () => useContext(KeycloakContext);
