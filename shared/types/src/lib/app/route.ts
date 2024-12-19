import type { RouteIcon } from './route-icon';
import type { RouteName } from './route-name';

export type Route = {
  text: string;
  icon: RouteIcon;
  route: RouteName;
};
