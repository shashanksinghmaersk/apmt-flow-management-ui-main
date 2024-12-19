import { FmpMenubar } from '@fes/shared-components';
import { RouteName } from '@fes/shared-types';
import { appRoutes } from '../../config/menu';
import { useAppStore } from '@fes/shared-store';
import { useCallback } from 'react';

type PageMenuDesktopProps = {
  route?: RouteName;
  onMenuItemClick: (link?: RouteName) => void;
  onMenuExpandChange?: (expanded: boolean) => void;
};

export const PageMenuDesktop = ({
  route,
  onMenuItemClick,
  onMenuExpandChange,
}: PageMenuDesktopProps) => {
  const { updateAppStore: updateStore, menuDesktopExpanded } = useAppStore();

  const handleExpandedChange = useCallback(() => {
    updateStore?.({ menuDesktopExpanded: !menuDesktopExpanded });
    onMenuExpandChange?.(!menuDesktopExpanded);
  }, [menuDesktopExpanded, onMenuExpandChange, updateStore]);

  return (
    <FmpMenubar
      expanded={menuDesktopExpanded}
      route={route}
      onMenuClick={onMenuItemClick}
      onExpandedChange={handleExpandedChange}
      menu={appRoutes}
    />
  );
};
