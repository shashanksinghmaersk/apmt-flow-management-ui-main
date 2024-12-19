import { useKeycloak } from '@fes/shared-api';
import { FmpNotifier, useNotifier } from '@fes/shared-components';
import { I18nLanguage, useTranslation } from '@fes/shared-i18n';
import {
  ApiContext,
  ApiContextType,
  ApiContextValue,
  AppContext,
  AppContextType,
  AppContextValue,
  KeycloakContext,
  KeycloakContextType,
  KeycloakContextValue,
} from '@fes/shared-store';
import { MdsConfig } from '@fes/shared-theme';
import '@fes/shared-theme-light';
import cx from 'classnames';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDebounceCallback, useResizeObserver } from 'usehooks-ts';
import { PageApplication } from '../components/page-application/page-application';
import { PageStatus } from '../components/page-status/page-status';
import { checkIsAppRoute } from '../config/menu';

import type { RouteName } from '@fes/shared-types';
import type { AppProps } from 'next/app';
import type { AppInitialProps } from '../types';

import './_app.scss';
import './_global.scss';

type Size = {
  width?: number;
  height?: number;
};

type AppState = {
  api: ApiContextType;
  keycloak: KeycloakContextType;
  app: AppContextType;
};

const getRouteName = (pathname: string) => {
  const routeName = pathname.split('/')[1] as RouteName;

  return routeName;
};

function App({ Component, pageProps, ...rest }: AppProps<AppInitialProps>) {
  const appHtmlRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { i18n, t } = useTranslation();
  const { notify, Notifications } = useNotifier({ duration: 10 });
  const { keycloakConfig, env } = pageProps;
  const isDevelopment = env?.nodeEnv === 'development';
  const routeName = getRouteName(router.pathname);
  const isAppRoute = checkIsAppRoute(routeName);
  const activeMenuItem = isAppRoute ? routeName : 'takt';

  const [state, setState] = useState<AppState>({
    api: {
      apiBaseUrl: env?.apiBaseUrl,
      apiBaseUrlWs: env?.apiBaseUrlWs,
      remoteBaseUrl: env?.remoteBaseUrl,
      notify,
    },
    keycloak: {},
    app: { isDevelopment, menuItem: activeMenuItem },
  });

  if (!isDevelopment) {
    MdsConfig.iconsDynamicImportPath = './_next/assets';
  }

  const updateApiStore = useCallback(
    (value: ApiContextValue) => {
      setState((_state) => ({ ..._state, api: { ..._state.api, ...value } }));
    },
    [setState],
  );

  const updateKeycloakStore = useCallback(
    (value: KeycloakContextValue) => {
      setState((_state) => ({
        ..._state,
        keycloak: { ..._state.keycloak, ...value },
      }));
    },
    [setState],
  );

  const updateAppStore = useCallback(
    (value: AppContextValue) => {
      setState((_state) => ({ ..._state, app: { ..._state.app, ...value } }));
    },
    [setState],
  );

  const initRoutes = useCallback(() => {
    const menuItem = getRouteName(router.pathname);

    if (menuItem !== state.app.menuItem) {
      updateAppStore({ menuItem });
    }
  }, [router.pathname, state.app.menuItem, updateAppStore]);

  const handleRouteChange = useCallback(
    (link?: RouteName) => {
      if (link) {
        updateAppStore({ menuItem: link });
      }
    },
    [updateAppStore],
  );

  const handleAppWidthChange = useCallback(
    ({ width }: Size) => {
      updateAppStore({ appWidth: width });
    },
    [updateAppStore],
  );

  const handleMenuMobileExpandedChange = useCallback(
    (expanded: boolean) => updateAppStore({ menuMobileExpanded: expanded }),
    [updateAppStore],
  );

  const handleLanguageChange = useCallback(
    (language: I18nLanguage) => updateAppStore({ language }),
    [updateAppStore],
  );

  const handleSignout = useCallback(() => {
    state.keycloak.logout?.();
  }, [state.keycloak]);

  useEffect(() => {
    const appWidth = state.app.appWidth || 0;

    if (appWidth >= 700) {
      updateAppStore({ fit: 'medium' });
    } else {
      updateAppStore({ fit: 'small' });
    }
  }, [state.app.appWidth, updateAppStore]);

  useEffect(() => {
    const currentLanguage = i18n.language;

    if (currentLanguage !== state.app.language) {
      i18n.changeLanguage(state.app.language);
    }
  }, [i18n, state.app.language]);

  useEffect(() => {
    initRoutes();

    updateApiStore({
      apiBaseUrl: env?.apiBaseUrl || window.location.origin,
      apiBaseUrlWs:
        env?.apiBaseUrlWs || window.location.origin.replace('https', 'wss'),
      remoteBaseUrl: env?.remoteBaseUrl || window.location.origin,
    });
  }, [
    env?.apiBaseUrl,
    env?.apiBaseUrlWs,
    env?.remoteBaseUrl,
    initRoutes,
    updateApiStore,
  ]);

  const onResize = useDebounceCallback(handleAppWidthChange, 200);
  useResizeObserver({ ref: appHtmlRef, onResize });

  useKeycloak({
    config: keycloakConfig,
    isDevelopment,
    updateKeycloakStore,
  });

  const isAppWidthInitialized = !!state.app.appWidth;
  const isAppAuthenticated = !!state.keycloak?.authenticated;

  const classNames = cx('app', {
    'app--mobile': state.app.fit === 'small',
  });

  return (
    <ApiContext.Provider value={{ ...state.api, updateApiStore }}>
      <KeycloakContext.Provider
        value={{ ...state.keycloak, updateKeycloakStore }}
      >
        <AppContext.Provider value={{ ...state.app, updateAppStore }}>
          <div className={classNames} ref={appHtmlRef}>
            {!isAppWidthInitialized && (
              <PageStatus message={t('Application initializing')} />
            )}
            {isAppWidthInitialized && !isAppAuthenticated && (
              <PageStatus message={t('Not Authenticated')} />
            )}
            {isAppWidthInitialized && isAppAuthenticated && isAppRoute && (
              <PageApplication
                onDesktopMenuExpandedChange={handleMenuMobileExpandedChange}
                onMobileMenuExpandedChange={handleMenuMobileExpandedChange}
                onLanguageChange={handleLanguageChange}
                onRouteChange={handleRouteChange}
                onSignout={handleSignout}
                route={routeName}
              >
                <Component pageProps={pageProps} {...rest} />
              </PageApplication>
            )}
            {isAppWidthInitialized && isAppAuthenticated && !isAppRoute && (
              <Component pageProps={pageProps} {...rest} />
            )}
          </div>
          <FmpNotifier Notifications={Notifications} />
        </AppContext.Provider>
      </KeycloakContext.Provider>
    </ApiContext.Provider>
  );
}

export default App;
