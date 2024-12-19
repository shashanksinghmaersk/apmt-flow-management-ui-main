import { apiEndpointMap } from '../../api';

import type { ApiEndpoint, ApiEndpointMapInfo } from '@fes/shared-types';

export type GetEndpointDetailsProps = {
  endpoint: ApiEndpoint;
  apiBaseUrl?: string;
  apiBaseUrlWs?: string;
};

export const getEndpointDetails = ({
  endpoint: _endpoint,
  apiBaseUrl,
  apiBaseUrlWs,
}: GetEndpointDetailsProps) => {
  let endpoint: ApiEndpointMapInfo | undefined;

  if (apiEndpointMap[_endpoint]) {
    endpoint = { ...apiEndpointMap[_endpoint] };
  }

  if (endpoint) {
    for (const [_key, path] of Object.entries(endpoint)) {
      const key = _key as keyof ApiEndpointMapInfo;
      if (key === 'socket') {
        let wssUrl = `${apiBaseUrlWs}/${path}`;
        wssUrl = wssUrl.replace('https', 'wss');
        wssUrl = wssUrl.replace('http', 'wss');
        wssUrl = wssUrl.replace('ws://', 'wss://');

        endpoint[key] = wssUrl;
      } else {
        endpoint[key] = `${apiBaseUrl}/${path}`;
      }
    }
  }

  return endpoint;
};
