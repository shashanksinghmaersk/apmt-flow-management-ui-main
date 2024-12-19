import { FmpMenubarTablet } from '@fes/shared-components';
import { useAppStore } from '@fes/shared-store';
import { RouteName } from '@fes/shared-types';
import { appRoutes } from '../../config/menu';

type PageMenuMobileProps = {
  onMenuItemClick: (link?: RouteName) => void;
  onMenuExpandChange: (expanded: boolean) => void;
};

export const PageMenuMobile = ({
  onMenuItemClick,
  onMenuExpandChange,
}: PageMenuMobileProps) => {
  const store = useAppStore();

  return (
    <FmpMenubarTablet
      active={store.menuItem}
      onMenuClick={onMenuItemClick}
      onExpandedChange={onMenuExpandChange}
      className="app__tablet-menu"
      menu={appRoutes}
      expanded={store.menuMobileExpanded}
    />
  );
};
