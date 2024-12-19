import { useApiStore, useKeycloakStore, useAppStore } from '@fes/shared-store';
import axios from 'axios';
import { deepmerge } from 'deepmerge-ts';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getEndpointDetails } from '../../utilities/get-endpoint-details/get-endpoint-details';
import { queryUrl } from '../../utilities/query-url/query-url';
import { validateNormalisedResponse } from '../../utilities/validate-normalised-response/validate-normalised-response';
import { webSocketConnection } from '../../utilities/web-socket-connection/web-socket-connection';

import type {
  ApiEndpoint,
  ApiMeta,
  ApiRequest,
  ApiResponse,
  NotificationProps,
} from '@fes/shared-types';
import type { AxiosRequestConfig } from 'axios';

type UseEndpointState<DATA_TYPE, DATA_RESPONSE_TYPE> = {
  loading: boolean;
  loadingError: boolean;
  loadingInitial: boolean;
  updating: boolean;
  data: DATA_RESPONSE_TYPE | undefined;
  meta: ApiMeta<DATA_TYPE> | undefined;
};

export type UseEndpointProps<REQUEST_TYPE> = {
  endpoint: ApiEndpoint;
  apiBaseUrl?: string;
  apiBaseUrlWs?: string;
  token?: string;
  options?: AxiosRequestConfig;
  request?: REQUEST_TYPE;
  notify?: ((props: NotificationProps) => void) | undefined;
};

export type UseEndpointReturn<DATA_TYPE, DATA_RESPONSE_TYPE, REQUEST_TYPE> = {
  loading: boolean;
  loadingError: boolean;
  loadingInitial: boolean;
  updating: boolean;
  data: DATA_RESPONSE_TYPE | undefined;
  meta: ApiMeta<DATA_TYPE> | undefined;
  updateMeta: (_newMeta: Partial<ApiMeta<DATA_TYPE>>, preventUpdate?: boolean) => void;
  getRequest: (props?: {
    initialCall?: boolean;
    request?: REQUEST_TYPE;
    options?: AxiosRequestConfig;
  }) => void;
  postRequest: (_request?: REQUEST_TYPE) => void;
  removeRequest: (record: REQUEST_TYPE) => void;
  pause: (paused: boolean) => void;
};

const xRequester = 'FES-app; 9f6b1559e66a5fe9bfb9';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useEndpoint<
  DATA_TYPE,
  DATA_RESPONSE_TYPE,
  RESPONSE_TYPE extends ApiResponse<DATA_TYPE, DATA_RESPONSE_TYPE>,
  REQUEST_TYPE extends ApiRequest<DATA_RESPONSE_TYPE>,
>({
  endpoint,
  apiBaseUrl: _apiBaseUrl,
  apiBaseUrlWs: _apiBaseUrlWs,
  token: _token,
  options,
  request,
}: UseEndpointProps<REQUEST_TYPE>): UseEndpointReturn<
  DATA_TYPE,
  DATA_RESPONSE_TYPE,
  REQUEST_TYPE
> {
  const {
    apiBaseUrl: __apiBaseUrl,
    apiBaseUrlWs: __apiBaseUrlWs,
    notify,
  } = useApiStore();

  const { isDevelopment } = useAppStore();

  const { token: __token } = useKeycloakStore();

  const apiBaseUrl = _apiBaseUrl || __apiBaseUrl;
  const apiBaseUrlWs = _apiBaseUrlWs || __apiBaseUrlWs;
  const token = isDevelopment ? process.env.NEXT_PUBLIC_ACCESS_TOKEN : _token || __token;

  const [state, setState] = useState<UseEndpointState<DATA_TYPE, DATA_RESPONSE_TYPE>>({
    loading: false,
    loadingError: false,
    loadingInitial: false,
    updating: false,
    data: undefined,
    meta: undefined,
  });

  const pauseRef = useRef(false);
  const socketRef = useRef<WebSocket | null>(null);
  const metaRef = useRef<ApiMeta<DATA_TYPE>>({
    filters: [],
    pagination: {
      page: 1,
      itemsPerPage: 10,
    },
  });

  const endpointDetails = getEndpointDetails({
    endpoint,
    apiBaseUrl,
    apiBaseUrlWs,
  });

  const updateState = useCallback(
    (value: Partial<UseEndpointState<DATA_TYPE, DATA_RESPONSE_TYPE>>) => {
      setState((prevState) => ({ ...prevState, ...value }));
    },
    [],
  );

  const _updateMeta = useCallback((_newMeta: Partial<ApiMeta<DATA_TYPE>>) => {
    const oldMeta = metaRef.current;
    const newMeta = {
      ...oldMeta,
      ..._newMeta,
      pagination: deepmerge(oldMeta.pagination, _newMeta.pagination),
      options: deepmerge(oldMeta.options, _newMeta.options),
    } as ApiMeta<DATA_TYPE>;
    metaRef.current = newMeta;

    return newMeta;
  }, []);

  // ENDPOINT.POST
  const postRequest = useCallback(
    async (_request?: REQUEST_TYPE) => {
      if (!endpointDetails?.post) {
        console.warn(`use-api-route: no POST url for ${endpoint}`);
        return;
      }

      let isValidNormalisedResponse = false;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let request = (_request || {}) as any;

      if (metaRef.current) {
        const newMeta = { ...metaRef.current, ...(request.meta || {}) };

        metaRef.current = newMeta;

        request = { ...request, meta: newMeta };
      }

      updateState({ updating: true });

      try {
        const axiosPostResponse = await axios.post<RESPONSE_TYPE>(
          endpointDetails.post,
          request,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
              'X-Requestor': xRequester,
            },
          },
        );

        isValidNormalisedResponse = validateNormalisedResponse(axiosPostResponse.data);

        if (isValidNormalisedResponse) {
          const responseJson = axiosPostResponse.data;
          const data = responseJson.data;
          const meta = responseJson.meta;

          updateState({ data, meta, updating: false });
        } else {
          updateState({ updating: false });
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        notify?.({
          title: 'API Error Updating',
          subtitle: `Endpoint: ${endpoint}`,
          message: error.message,
          icon: 'exclamation-triangle-solid',
          appearance: 'error',
        });

        updateState({ updating: false });
      }
    },
    [endpointDetails?.post, updateState, endpoint, token, notify],
  );

  // ENDPOINT.GET
  const getRequest = useCallback(
    async (props?: {
      initialCall?: boolean;
      request?: REQUEST_TYPE;
      options?: AxiosRequestConfig;
    }) => {
      let url = endpointDetails?.get;

      if (!url) {
        console.warn(`use-api-route: no GET url for ${endpoint}`);
        return;
      }

      const { initialCall, request: _request, options: _options = {} } = props || {};

      // Setting loading states based on whether this is the initial call or not
      if (initialCall) {
        updateState({
          loading: true,
          loadingInitial: true,
          loadingError: false,
        });
      } else {
        updateState({ loading: true, loadingError: false });
      }

      if (_request) {
        url = queryUrl({ url, values: _request });
      }

      // Merge base options with any options passed to this specific request
      const config: AxiosRequestConfig = deepmerge(
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'X-Requestor': xRequester,
          },
        },
        options,
        _options,
      );

      try {
        const response = await axios.get<RESPONSE_TYPE>(url, config);

        // Validate the response to ensure it is in the expected format
        const isValidNormalisedResponse = validateNormalisedResponse(response.data);

        if (isValidNormalisedResponse && response.data) {
          if (response.data.meta) {
            _updateMeta(response.data.meta);
          }

          updateState({
            data: response.data.data,
            meta: response.data.meta,
            loadingError: false,
            loading: false,
            loadingInitial: false,
          });
        } else {
          updateState({
            loadingError: false,
            loading: false,
            loadingInitial: false,
          });
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        updateState({
          loadingError: true,
          loading: false,
          loadingInitial: false,
        });

        // Notify if the initial call fails
        if (initialCall) {
          notify?.({
            title: 'API Error loading',
            subtitle: `Endpoint: ${endpoint}`,
            message: error.message,
            icon: 'exclamation-triangle-solid',
            appearance: 'warning',
          });
        }
      }
    },
    [_updateMeta, endpoint, endpointDetails?.get, notify, options, token, updateState],
  );

  // ENDPOINT.SOCKET
  const websocketRequest = useCallback(() => {
    if (socketRef.current) {
      // Close any existing socket connection
      socketRef.current.close();
    }

    let url = `${endpointDetails?.socket}?access_token=${token}`;

    if (!url) {
      return;
    }

    if (request) {
      url = queryUrl({ url, values: { ...request } });
    }

    socketRef.current = webSocketConnection<string>({
      url,
      protocols: ['access_token', token || ''],
      onMessage: (event) => {
        let response: RESPONSE_TYPE | undefined;

        try {
          response = JSON.parse(event.data) as RESPONSE_TYPE;
          // eslint-disable-next-line no-empty
        } catch (error) {}

        const isValidNormalisedResponse =
          validateNormalisedResponse<RESPONSE_TYPE>(response);

        if (isValidNormalisedResponse) {
          response = JSON.parse(event.data);

          if (!pauseRef.current) {
            if (response?.meta) {
              _updateMeta(response.meta);
            }

            updateState({
              data: response?.data,
              meta: response?.meta,
              loadingError: false,
            });
          }
        }
      },
    });

    socketRef.current.onclose = () => {
      socketRef.current = null; // Reset socket reference on close
    };
  }, [endpointDetails?.socket, request, token, updateState, _updateMeta]);

  const pause = useCallback(
    (paused: boolean) => {
      pauseRef.current = paused; // Set the pause state
      if (!paused && apiBaseUrl) {
        getRequest(); // Immediately fetch data if resuming
      }
    },
    [apiBaseUrl, getRequest],
  );

  // ENDPOINT.REMOVE
  const removeRequest = useCallback((record: REQUEST_TYPE) => {
    console.log('API deletion is required for this record', record);
  }, []);

  const updateMeta = useCallback(
    (_newMeta: Partial<ApiMeta<DATA_TYPE>>, preventUpdate?: boolean) => {
      _updateMeta(_newMeta);

      if (!preventUpdate) {
        postRequest();
      }
    },
    [_updateMeta, postRequest],
  );

  useEffect(() => {
    if (apiBaseUrlWs) {
      websocketRequest();
    }

    // Cleanup on component unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return useMemo(
    () => ({
      ...state,
      pause,
      postRequest,
      removeRequest,
      getRequest,
      updateMeta,
    }),
    [state, pause, postRequest, removeRequest, getRequest, updateMeta],
  );
}
