import {
  TRAFFIC_MAP_BASE_RECORD,
  TRAFFIC_MAP_ITEM_RECORD,
  useEndpoint,
} from '@fes/shared-api';
import {
  FmpPage,
  FmpTrafficActionPanel,
  FmpTrafficMap,
  FmpTrafficStoreContext,
  FmpTrafficStoreContextType,
  FmpTrafficStoreContextValue,
  defaultFmpTrafficStoreValues,
} from '@fes/shared-components';
import { getUniqueId } from '@fes/shared-utilities';
import { useCallback, useRef, useState } from 'react';

import 'maplibre-gl/dist/maplibre-gl.css';

import type {
  TrafficMapBase,
  TrafficMapBaseRequest,
  TrafficMapBaseResponse,
  TrafficMapItem,
  TrafficMapItemRequest,
  TrafficMapItemResponse,
  TrafficMapItemState,
  TrafficMapItemStateRequest,
  TrafficMapItemStateResponse,
} from '@fes/shared-types';

const TrafficPage = () => {
  const mapKey = useRef(getUniqueId());
  const [store, setStore] = useState<FmpTrafficStoreContextType>({
    ...defaultFmpTrafficStoreValues,
  });

  const updateFmpTrafficStore = useCallback(
    (values: FmpTrafficStoreContextValue) => {
      setStore((_state) => ({ ..._state, ...values }));
    },
    [],
  );

  const { data: base } = useEndpoint<
    TrafficMapBase,
    TrafficMapBase,
    TrafficMapBaseResponse,
    TrafficMapBaseRequest
  >({
    endpoint: 'traffic-map-base',
  });

  const { data: item, meta: itemMeta } = useEndpoint<
    TrafficMapItem,
    TrafficMapItem,
    TrafficMapItemResponse,
    TrafficMapItemRequest
  >({
    endpoint: 'traffic-map-item',
  });

  const { data: itemState, meta: itemStateMeta } = useEndpoint<
    TrafficMapItemState,
    TrafficMapItemState,
    TrafficMapItemStateResponse,
    TrafficMapItemStateRequest
  >({
    endpoint: 'traffic-map-item-state',
  });

  return (
    <FmpTrafficStoreContext.Provider
      value={{ ...store, updateFmpTrafficStore }}
    >
      <FmpPage>
        {!base && !item && (
          <FmpTrafficMap
            key={mapKey.current}
            base={base || TRAFFIC_MAP_BASE_RECORD}
            item={item || TRAFFIC_MAP_ITEM_RECORD}
            itemState={itemState}
          />
        )}
        <FmpTrafficActionPanel
          filters={itemStateMeta?.filters || itemMeta?.filters || []}
        />
      </FmpPage>
    </FmpTrafficStoreContext.Provider>
  );
};

const getServerSideProps = async () => {
  return {
    props: {
      keycloakConfig: {
        url: process.env.NEXT_PUBLIC_KEYCLOAK_AUTH_URL || '',
        realm: process.env.NEXT_PUBLIC_KEYCLOAK_REALM || '',
        clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID || '',
      },
      env: {
        nodeEnv: process.env.NODE_ENV || '',
        apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || '',
        apiBaseUrlWs: process.env.NEXT_PUBLIC_API_BASE_WS_URL || '',
        remoteBaseUrl: process.env.NEXT_PUBLIC_REMOTE_BASE_URL || '',
      },
    },
  };
};

export { TrafficPage as default, getServerSideProps };
