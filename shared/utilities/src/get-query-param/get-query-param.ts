export const getQueryParam = () => {
  const url = decodeURI(location.href);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const queryParams: Record<string, any> = {};

  if (typeof url === 'string') {
    const params = url.split('?');
    const eachParamsArr = params[1].split('&');

    if (eachParamsArr && eachParamsArr.length) {
      eachParamsArr.forEach((param) => {
        const keyValuePair = param.split('=');
        const key = keyValuePair[0];
        const value = keyValuePair[1];
        queryParams[key] = value;
      });
    }
  }

  return queryParams;
};
