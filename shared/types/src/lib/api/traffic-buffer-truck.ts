import type { TrafficMapLngLatLike } from './traffic-map-lng-lat-like';

export type TrafficBufferTruck = {
  id: string;
  laden: boolean;
  andon: boolean;
  duration: number;
  investigation: boolean;
  durationExceeded: boolean;
  center: TrafficMapLngLatLike;
};
