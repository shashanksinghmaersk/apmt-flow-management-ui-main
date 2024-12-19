import type {
  TrafficMapItemState,
  TrafficMapItemStateResponse,
  TrafficMapLayerItem,
  TrafficMapSourceItem,
} from '@fes/shared-types';

export const TRAFFIC_MAP_ITEM_STATUS_SOURCE_LAYERS: TrafficMapLayerItem[] = [
  {
    id: 'layer-3',
    layer: {
      id: 'source-3',
      type: 'fill',
      source: 'source-3',
      layout: {},
      paint: {
        'fill-color': '#088',
        'fill-opacity': 0.8,
      },
    },
  },
];

export const TRAFFIC_MAP_ITEM_STATUS_SOURCE_RECORDS: TrafficMapSourceItem[] = [
  {
    id: 'source-3',
    type: 'UPDATE',
    source: {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: [],
        geometry: {
          type: 'Polygon',
          coordinates: [[[-67.13734351262877, 45.137451890638886]]],
        },
      },
    },
  },
];

export const TRAFFIC_MAP_ITEM_STATUS_RECORD: TrafficMapItemState = {
  source: TRAFFIC_MAP_ITEM_STATUS_SOURCE_RECORDS,
  layer: TRAFFIC_MAP_ITEM_STATUS_SOURCE_LAYERS,
};

export const TRAFFIC_MAP_ITEM__STATUS_RESPONSE: TrafficMapItemStateResponse = {
  data: TRAFFIC_MAP_ITEM_STATUS_RECORD,
};
