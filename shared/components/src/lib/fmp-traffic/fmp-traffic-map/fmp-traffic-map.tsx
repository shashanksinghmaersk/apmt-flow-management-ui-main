import { getUniqueId } from '@fes/shared-utilities';
import deepEqual from 'deep-equal';
import { Map } from 'maplibre-gl';
import { useCallback, useEffect, useRef } from 'react';
import { useFmpTrafficStore } from '../fmp-traffic-store/fmp-traffic-store.context';
import { fmpTrafficConfig } from '../fmp-traffic.config';
import { addLayer } from './utilities/add-layer/add-layer';
import { addSource } from './utilities/add-source/add-source';

import type {
  TrafficMapBase,
  TrafficMapItem,
  TrafficMapItemState,
} from '@fes/shared-types';

export type FmpTrafficMapProps = {
  base?: TrafficMapBase;
  item?: TrafficMapItem;
  itemState?: TrafficMapItemState;
};

export const FmpTrafficMap = (props: FmpTrafficMapProps) => {
  const oldProps = useRef<FmpTrafficMapProps>(props);
  const { zoom, bounds, center, minZoom, maxZoom, updateFmpTrafficStore } =
    useFmpTrafficStore();
  const id = useRef(getUniqueId());
  const map = useRef<Map | null>(null);

  const handleBaseUpdate = useCallback(
    (_base?: TrafficMapBase) => {
      if (_base) {
        if (_base && map.current) {
          addSource(map.current, _base?.source);
          addLayer(map.current, _base?.layer);
        }

        updateFmpTrafficStore?.({
          zoom: _base?.zoom || fmpTrafficConfig.zoom,
          bounds: _base?.bounds || fmpTrafficConfig.bounds,
          center: _base?.center || fmpTrafficConfig.center,
        });
      }
    },
    [updateFmpTrafficStore],
  );

  const handleItemUpdate = useCallback((_item?: TrafficMapItem) => {
    if (_item && map.current) {
      addSource(map.current, _item?.source);
      addLayer(map.current, _item?.layer);
    }
  }, []);

  const handleItemStatusUpdate = useCallback(
    (_itemStatus: TrafficMapItemState) => {
      if (_itemStatus && map.current) {
        addSource(map.current, _itemStatus?.source);
        addLayer(map.current, _itemStatus?.layer);
      }
    },
    [],
  );

  const initMap = useCallback(
    (_props: FmpTrafficMapProps) => {
      map.current = new Map({
        container: id.current,
        style: 'https://demotiles.maplibre.org/style.json',
        minZoom,
        maxZoom,
        zoom,
        bounds,
        center,
        boxZoom: true,
      });

      map.current.on('load', () => {
        handleBaseUpdate(_props.base);
        handleItemUpdate(_props.item);
      });

      map.current.on('zoomend', () => {
        if (map.current !== null) {
          const newZoom = map.current.getZoom();
          updateFmpTrafficStore?.({ zoom: newZoom });
        }
      });
    },
    [
      bounds,
      center,
      handleBaseUpdate,
      handleItemUpdate,
      maxZoom,
      minZoom,
      updateFmpTrafficStore,
      zoom,
    ],
  );

  useEffect(() => {
    initMap(props);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!deepEqual(oldProps.current.base, props.base)) {
      oldProps.current = { ...oldProps.current, base: props.base };

      handleBaseUpdate(props.base);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.base]);

  useEffect(() => {
    if (!deepEqual(oldProps.current.item, props.item)) {
      oldProps.current = { ...oldProps.current, item: props.item };

      handleItemUpdate(props.item);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.item]);

  useEffect(() => {
    if (props.itemState) {
      handleItemStatusUpdate(props.itemState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.itemState]);

  useEffect(() => {
    map.current?.setZoom(zoom);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zoom]);

  useEffect(() => {
    map.current?.setMaxBounds(bounds);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bounds]);

  useEffect(() => {
    map.current?.setCenter(center);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [center]);

  return (
    <div
      id={id.current}
      style={{ position: 'fixed', top: 80, right: 0, bottom: 0, left: 0 }}
    />
  );
};
