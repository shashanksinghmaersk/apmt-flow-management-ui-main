import Keycloak from 'keycloak-js';
import { useCallback } from 'react';
import { useDidMount } from 'rooks';

import type { KeycloakContextValue } from '@fes/shared-store';
import type { KeycloakConfig } from 'keycloak-js';

export type UseKeycloakProps = {
  updateKeycloakStore?: (value: KeycloakContextValue) => void;
  isDevelopment?: boolean;
  config?: KeycloakConfig;
};

export const useKeycloak = ({
  updateKeycloakStore,
  isDevelopment,
  config,
}: UseKeycloakProps) => {
  const updateKeycloakInfo = useCallback(
    async (keycloak?: Keycloak) => {
      if (keycloak && !isDevelopment) {
        const authenticated = keycloak.authenticated;
        const profile = await keycloak.loadUserProfile();
        const user = await keycloak.loadUserInfo();
        const token = keycloak.token;
        const tokenParsed = keycloak.tokenParsed;

        updateKeycloakStore?.({
          logout: keycloak.logout,
          token,
          authenticated,
          profile,
          user,
          tokenParsed,
        });
      } else if (isDevelopment) {
        updateKeycloakStore?.({
          authenticated: true,
          profile: {
            firstName: 'Mock',
            lastName: 'User',
            email: 'mock.user@maersk.com',
            username: 'mock.user@maersk.com',
          },
        });
      }
    },
    [isDevelopment, updateKeycloakStore],
  );

  const refreshToken = useCallback(
    async (keycloak: Keycloak) => {
      if (keycloak.authenticated) {
        const tokenExpiry = (keycloak.tokenParsed?.exp || 0) * 1000;
        const currentTime = new Date().getTime();

        if (tokenExpiry - currentTime < 60000) {
          try {
            const refreshed = await keycloak.updateToken(30);
            if (refreshed) {
              updateKeycloakInfo(keycloak);
            }
          } catch (error) {
            console.error('Failed to refresh the token', error);
          }
        }
      }
    },
    [updateKeycloakInfo],
  );

  const initAuthentication = useCallback(async () => {
    if (!isDevelopment) {
      const keycloak = new Keycloak(config);

      await keycloak.init({
        onLoad: 'login-required',
        checkLoginIframe: true,
        enableLogging: true,
      });

      updateKeycloakInfo(keycloak);

      const refreshInterval = setInterval(() => {
        refreshToken(keycloak);
      }, 30000);
      return () => clearInterval(refreshInterval);
    } else {
      updateKeycloakInfo();

      // No cleanup necessary here, so return nothing (undefined)
      return undefined;
    }
  }, [config, isDevelopment, refreshToken, updateKeycloakInfo]);

  useDidMount(() => {
    initAuthentication();
  });
};
