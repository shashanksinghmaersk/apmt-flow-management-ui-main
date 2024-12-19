import type {
  TrafficMapLngLatBoundsLike,
  TrafficMapLngLatLike,
} from '@fes/shared-types';

export type FmpTrafficConfigType = {
  zoom: number;
  minZoom: number;
  maxZoom: number;
  bounds?: TrafficMapLngLatBoundsLike;
  center: TrafficMapLngLatLike;
};

export const fmpTrafficConfig: FmpTrafficConfigType = {
  zoom: 2,
  minZoom: 1,
  maxZoom: 20,
  center: [73.9978, 40.7209],
  bounds: undefined,
};
