import type { TrafficMapLngLatLike } from './traffic-map-lng-lat-like';

export type TrafficMapLngLatBoundsLike =
  | [TrafficMapLngLatLike, TrafficMapLngLatLike]
  | [number, number, number, number];
