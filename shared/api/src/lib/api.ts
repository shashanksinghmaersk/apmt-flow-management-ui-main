import { ApiEndpointMap } from '@fes/shared-types';

export const apiEndpointMap: ApiEndpointMap = {
  'takt-list': {
    get: 'management/getTaktData',
    post: 'management/getTaktData',
    socket: 'management/flow-takt-details',
  },
  'exception-andon-list': {
    post: 'exceptions/exception/updateandon',
  },
  'exception-error-list': {
    post: 'exceptions/exception/updateerror',
  },
  'insight-alert-list': {
    get: 'exceptions/insights/insightalerts',
    post: 'exceptions/insights/filterinsightalerts',
  },
  'insight-detail': {
    get: 'exceptions/insights/drawerinsightdetails',
  },
  'standby-pinning-list': {
    get: 'management/qc-mapping-data',
    post: 'management/qc-mapping-data',
    socket: 'management/qc-mapping-data',
  },
  'traffic-map-base': {
    get: 'management/traffic-map-base',
  },
  'traffic-map-item': {
    get: 'management/traffic-item-base',
  },
  'traffic-map-item-state': {
    socket: 'management/traffic-map-item-state',
  },
  'traffic-buffer': {
    get: 'management/fes-buffer',
    socket: 'management/fes-buffer',
  },
  'traffic-buffer-truck-list': {
    get: 'management/fes-buffer-trucks',
    socket: 'management/fes-buffer-trucks-ws',
  },
  'remote-handling': {
    get: 'management/container-handling-equipments',
    socket: 'management/container-handling-equipments-ws',
  },
  'refresh-endpoint': {
    socket: 'management/refresh-endpoint',
  },
};
