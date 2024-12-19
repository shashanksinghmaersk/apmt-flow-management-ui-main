import { Route } from '@fes/shared-types';
import { McTooltip } from '@maersk-global/mds-react-wrapper';
import { FmpMenubarItem } from '../../../fmp-menubar-item/fmp-menubar-item';

export type FmpMenubarItemWrapperProps = {
  route?: Route;
  expanded?: boolean;
  active?: boolean;
  onMenuClick?: () => void;
};

export const FmpMenubarItemWrapper = ({
  route,
  expanded,
  active,
  onMenuClick,
}: FmpMenubarItemWrapperProps) => {
  const props = {
    className: 'fmp-menubar__item',
    active: active,
    expanded: expanded,
    onClick: onMenuClick,
  };

  return !expanded ? (
    <McTooltip position="right-center">
      <FmpMenubarItem slot="trigger" {...props} {...route} />
      <div>{route?.text}</div>
    </McTooltip>
  ) : (
    <FmpMenubarItem {...props} {...route} />
  );
};
