import { useEndpoint } from '@fes/shared-api';
import { useAppStore } from '@fes/shared-store';
import cx from 'classnames';
import { useCallback, useState } from 'react';
import { FmpCard } from '../../fmp-card/fmp-card';
import { useFmpTrafficStore } from '../fmp-traffic-store/fmp-traffic-store.context';
import { FmpBufferPanelChart } from './components/fmp-traffic-buffer-panel-chart/fmp-traffic-buffer-panel-chart';
import { FmpBufferPanelHeader } from './components/fmp-traffic-buffer-panel-header/fmp-traffic-buffer-panel-header';
import { FmpBufferPanelTable } from './components/fmp-traffic-buffer-panel-table/fmp-traffic-buffer-panel-table';

import type {
  TrafficBuffer,
  TrafficBufferRequest,
  TrafficBufferResponse,
  TrafficBufferTruck,
  TrafficBufferTruckListRequest,
  TrafficBufferTruckListResponse,
  TrafficMapLngLatLike,
} from '@fes/shared-types';

import './fmp-traffic-buffer-panel.scss';
import { useDidMount } from 'rooks';

export const FmpTrafficBufferPanel = () => {
  const { fit } = useAppStore();
  const { updateFmpTrafficStore } = useFmpTrafficStore();
  const [collapsed, setCollapsed] = useState(true);

  const classNames = cx('fmp-traffic-buffer-panel', {
    [`fmp-traffic-buffer-panel--${fit}`]: !!fit,
    [`fmp-traffic-buffer-panel--collapsed`]: collapsed,
  });

  const { data: trafficBuffer } = useEndpoint<
    TrafficBuffer,
    TrafficBuffer,
    TrafficBufferResponse,
    TrafficBufferRequest
  >({
    endpoint: 'traffic-buffer',
  });

  const { data: trafficBufferTruckList, getRequest } = useEndpoint<
    TrafficBufferTruck,
    TrafficBufferTruck[],
    TrafficBufferTruckListResponse,
    TrafficBufferTruckListRequest
  >({
    endpoint: 'traffic-buffer-truck-list',
  });

  const handleCollapseToggle = useCallback(() => {
    setCollapsed((_collapsed) => !_collapsed);
  }, []);

  const handleItemPanTo = useCallback(
    (center: TrafficMapLngLatLike) => {
      updateFmpTrafficStore?.({ center, zoom: 6 });
    },
    [updateFmpTrafficStore],
  );

  useDidMount(() => {
    getRequest();
  });

  return (
    <FmpCard className={classNames} fit={fit} elevation={1}>
      <FmpBufferPanelHeader
        data={trafficBuffer}
        collapsed={collapsed}
        onToggleCollapse={handleCollapseToggle}
      />
      <div className="fmp-traffic-buffer-panel__body">
        <div className="fmp-traffic-buffer-panel__body-table">
          <FmpBufferPanelTable
            data={trafficBufferTruckList}
            onItemPanTo={handleItemPanTo}
          />
        </div>
        <div className="fmp-traffic-buffer-panel__body-diagram">
          <FmpBufferPanelChart data={trafficBuffer?.chart} height={120} width={300} />
        </div>
      </div>
    </FmpCard>
  );
};
