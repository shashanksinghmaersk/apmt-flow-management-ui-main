import type {
  ApiMetaFilter,
  TrafficMapBase,
  TrafficMapBaseResponse,
  TrafficMapLayerItem,
  TrafficMapSourceItem,
} from '@fes/shared-types';

export const TRAFFIC_MAP_BASE_SOURCE_LAYERS: TrafficMapLayerItem[] = [
  {
    id: 'layer-1',
    layer: {
      id: 'source-1',
      type: 'fill',
      source: 'source-1',
      layout: {},
      paint: {
        'fill-color': '#088',
        'fill-opacity': 0.8,
      },
    },
  },
];

export const TRAFFIC_MAP_BASE_SOURCE_RECORDS: TrafficMapSourceItem[] = [
  {
    id: 'source-1',
    type: 'CREATE',
    source: {
      type: 'geojson',
      data: {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [-121.353637, 40.584978],
              [-121.284551, 40.584758],
            ],
          ],
        },
        properties: [],
      },
    },
  },
];

export const TRAFFIC_MAP_BASE_RECORD: TrafficMapBase = {
  id: 'harbour-morocco-1',
  harbour: 'Name of some harbour in Morocco',
  center: [-73.9978, 40.7209],
  /*
  bounds: [
    [-74.04728500751165, 40.68392799015035], // Southwest coordinates
    [-73.91058699000139, 40.87764500765852], // Northeast coordinates
  ],
  */
  zoom: 10,
  minZoom: 1,
  maxZoom: 20,
  source: TRAFFIC_MAP_BASE_SOURCE_RECORDS,
  layer: TRAFFIC_MAP_BASE_SOURCE_LAYERS,
};

export const TRAFFIC_MAP_BASE_META_FILTERS: ApiMetaFilter[] = [];

export const TRAFFIC_MAP_BASE_RESPONSE: TrafficMapBaseResponse = {
  data: TRAFFIC_MAP_BASE_RECORD,
  meta: {
    filters: TRAFFIC_MAP_BASE_META_FILTERS,
    pagination: { page: 1, itemsPerPage: 10 },
  },
};
