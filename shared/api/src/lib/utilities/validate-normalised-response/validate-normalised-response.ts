export function validateNormalisedResponse<T>(response?: T) {
  if (!response) {
    return false;
  }

  let isValidResponse = false;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let _response: any = response;

  try {
    if (typeof response === 'string') {
      _response = JSON.parse(response);
    }
    if (_response !== null && typeof _response !== 'string' && _response.data) {
      isValidResponse = true;
    }
  } catch (error) {
    isValidResponse = false;
  }

  return isValidResponse;
}
