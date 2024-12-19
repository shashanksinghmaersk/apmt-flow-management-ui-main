import type {
  TrafficMapItem,
  TrafficMapItemResponse,
  TrafficMapLayerItem,
  TrafficMapSourceItem,
} from '@fes/shared-types';

export const TRAFFIC_MAP_ITEM_LAYER_RECORDS: TrafficMapLayerItem[] = [
  {
    id: 'layer-2',
    layer: {
      id: 'source-2',
      type: 'fill',
      source: 'source-2',
      layout: {},
      paint: {
        'fill-color': '#088',
        'fill-opacity': 0.8,
      },
    },
  },
];

export const TRAFFIC_MAP_ITEM_SOURCE_RECORDS: TrafficMapSourceItem[] = [
  {
    id: 'source-2',
    type: 'CREATE',
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

export const TRAFFIC_MAP_ITEM_RECORD: TrafficMapItem = {
  source: TRAFFIC_MAP_ITEM_SOURCE_RECORDS,
  layer: TRAFFIC_MAP_ITEM_LAYER_RECORDS,
};

export const TRAFFIC_MAP_ITEM_RESPONSE: TrafficMapItemResponse = {
  data: TRAFFIC_MAP_ITEM_RECORD,
};
