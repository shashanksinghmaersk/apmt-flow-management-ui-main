import { createContext, useContext } from 'react';
import { fmpTrafficConfig } from '../fmp-traffic.config';

import type {
  TrafficMapLngLatBoundsLike,
  TrafficMapLngLatLike,
} from '@fes/shared-types';

export type FmpTrafficStoreContextType = {
  zoom: number;
  minZoom: number;
  maxZoom: number;
  bounds?: TrafficMapLngLatBoundsLike;
  center: TrafficMapLngLatLike;
  updateFmpTrafficStore?: (values: FmpTrafficStoreContextValue) => void;
};

export type FmpTrafficStoreContextValue = Partial<
  Omit<FmpTrafficStoreContextType, 'updateFmpTrafficStore'>
>;

export const defaultFmpTrafficStoreValues: FmpTrafficStoreContextType = {
  ...fmpTrafficConfig,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updateFmpTrafficStore: () => {},
};

export const FmpTrafficStoreContext = createContext<FmpTrafficStoreContextType>(
  {
    ...defaultFmpTrafficStoreValues,
  },
);

export const useFmpTrafficStore = () => useContext(FmpTrafficStoreContext);
