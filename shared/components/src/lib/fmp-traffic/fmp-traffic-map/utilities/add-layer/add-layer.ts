import type { TrafficMapLayerItem } from '@fes/shared-types';
import type { Map } from 'maplibre-gl';

export const addLayer = (map: Map, source: TrafficMapLayerItem[] = []) => {
  source.forEach((item) => {
    map.addLayer(item.layer);
  });
};
