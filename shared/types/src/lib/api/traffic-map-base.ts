import type { TrafficMapSourceItem } from './traffic-map-source-item';
import type { TrafficMapLayerItem } from './traffic-map-layer-item';
import type { TrafficMapLngLatLike } from './traffic-map-lng-lat-like';
import type { TrafficMapLngLatBoundsLike } from './traffic-map-lng-lat-bounds-like';

export type TrafficMapBase = {
  id: string;
  harbour: string;
  center: TrafficMapLngLatLike;
  bounds?: TrafficMapLngLatBoundsLike;
  zoom: number;
  maxZoom: number;
  minZoom: number;
  source: TrafficMapSourceItem[];
  layer: TrafficMapLayerItem[];
};
