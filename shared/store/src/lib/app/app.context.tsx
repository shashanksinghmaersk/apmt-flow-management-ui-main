import { createContext, useContext } from 'react';

import type { I18nLanguage } from '@fes/shared-i18n';
import type { RouteName, ThemeFit } from '@fes/shared-types';

export type AppContextType = {
  pageTitle?: string;
  pageSubtitle?: string;
  language?: I18nLanguage;
  isDevelopment?: boolean;
  menuMobileExpanded?: boolean;
  menuDesktopExpanded?: boolean;
  menuItem?: RouteName;
  appWidth?: number;
  fit?: ThemeFit;
  updateAppStore?: (values: AppContextValue) => void;
};

export type AppContextValue = Partial<Omit<AppContextType, 'updateAppStore'>>;

export const AppContext = createContext<AppContextType>({});

export const useAppStore = () => useContext(AppContext);
