// WebSocketConnectionProps to customize the behavior per page
export interface WebSocketConnectionProps<T> {
  url: string; // WebSocket server URL
  protocols?: string | string[] | undefined; // The API allows exactly one header: Sec-WebSocket-Protocol
  onOpen?: (event: Event) => void; // Optional on open event handler
  onMessage?: (event: MessageEvent<T>) => void; // Optional on message event handler
  onError?: (event: Event | ErrorEvent) => void; // Optional on error event handler
  onClose?: (event: CloseEvent) => void; // Optional on close event handler
}

// Base function for creating a WebSocket connection
export const webSocketConnection = <T>(
  options: WebSocketConnectionProps<T>,
) => {
  const ws = new WebSocket(options.url);

  ws.addEventListener('message', (event) => {
    options.onMessage?.(event);
  });

  ws.addEventListener('open', (event) => {
    options.onOpen?.(event);
  });

  ws.addEventListener('error', (event) => {
    options.onError?.(event);
  });

  ws.addEventListener('close', (event) => {
    options.onClose?.(event);
  });

  return ws;
};
