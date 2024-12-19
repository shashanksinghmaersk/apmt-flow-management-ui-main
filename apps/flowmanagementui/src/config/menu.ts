import { Route } from '@fes/shared-types';

export const checkIsAppRoute = (route: string) => {
  let isAppRoute = false;

  appRoutes.some((appRoute) => {
    if (appRoute.route === route) {
      isAppRoute = true;
      return true;
    } else {
      return false;
    }
  });

  return isAppRoute;
};

export const appRoutes: Route[] = [
  {
    icon: 'flow',
    text: 'Progress & TAKT',
    route: 'takt',
  },
  {
    icon: 'globe',
    text: 'Traffic View',
    route: 'traffic',
  },
  {
    icon: 'exclamation-triangle',
    text: 'Andons & Exceptions',
    route: 'exception',
  },
  {
    icon: 'chart-bars-vertical',
    text: 'FES Insights',
    route: 'insights',
  },
  {
    icon: 'crane',
    text: 'Standby & Pinning',
    route: 'standby',
  },
  {
    icon: 'file-check-stamp',
    text: 'Ops Standards',
    route: 'ops',
  },
  {
    icon: 'remote-control',
    text: 'VMT Remote',
    route: 'remote',
  },
];
