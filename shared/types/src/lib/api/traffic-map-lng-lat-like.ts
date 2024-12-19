export type TrafficMapLngLatLike =
  | {
      lng: number;
      lat: number;
    }
  | {
      lon: number;
      lat: number;
    }
  | [number, number];
