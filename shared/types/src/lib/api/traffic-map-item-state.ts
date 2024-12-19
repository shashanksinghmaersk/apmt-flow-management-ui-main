import type { TrafficMapLayerItem } from './traffic-map-layer-item';
import type { TrafficMapSourceItem } from './traffic-map-source-item';

export type TrafficMapItemState = {
  source: TrafficMapSourceItem[];
  layer: TrafficMapLayerItem[];
};
