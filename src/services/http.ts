import axios, { AxiosInstance } from 'axios';
import { SUCCESS_STATUSES } from './../../src/utils/constants';

// eslint-disable-next-line no-console

const headers = { 'content-type': 'application/json', 'access-control-allow-origin': '*' };

export const instance = axios.create();

const onFulfilled = (response: any): any => response?.data;

const filterValue = <T>(value: T): boolean => value !== undefined && value !== null;

function getToken(): string {
  return JSON.parse(localStorage.getItem('user') as string)?.token || '';
}

const setHeaders = (axiosApi: AxiosInstance): void => {
  const token = getToken();
  if (token) {
    axiosApi.defaults.headers['x-access-token'] = getToken();
  }
};

const getBaseUrl = (
  url: string | { baseURL: string; path: string },
  params: any,
  joinQueryArrayValues: any
): string => {
  let path = '';

  if (typeof url === 'string') {
    path = url;
  } else {
    path = url.baseURL + url.path;
  }

  path = params ? path + '?' + joinQueryArrayValues : path;
  setHeaders(instance);

  return path;
};

class HttpClient {
  public async get<T = any>(
    url: { path: string; baseURL: string } | string,
    params?: Record<string, any>,
    config?: any
  ): Promise<any> {
    const joinQueryArrayValues = params ? this.getQueryString(params, config?.joinQueryArrayValues) : null;
    const path = getBaseUrl(url, params, joinQueryArrayValues);

    return instance
      .get<T>(path, { ...config })
      .then(onFulfilled)
      .catch((e: Error) => {
        return e;
      });
  }

  public post<T = any, P = any>(
    url: { path: string; baseURL: string } | string,
    data?: P,
    params?: Record<string, any>,
    config?: any
  ): Promise<any> {
    const joinQueryArrayValues = params ? this.getQueryString(params, config?.joinQueryArrayValues) : null;
    const path = getBaseUrl(url, params, joinQueryArrayValues);

    return instance
      .post<T>(path, data, {
        ...config,
        ...headers,
      })
      .then(onFulfilled)
      .catch((e: Error) => {
        return e;
      });
  }

  public patch<T = any, P = any>(
    url: { path: string; baseURL: string } | string,
    data?: P,
    params?: Record<string, any>,
    config?: any
  ): Promise<any> {
    const joinQueryArrayValues = params ? this.getQueryString(params, config?.joinQueryArrayValues) : null;
    const path = getBaseUrl(url, params, joinQueryArrayValues);

    return instance
      .patch<T>(path, data, {
        ...config,
        ...headers,
      })
      .then(onFulfilled)
      .catch((e: Error) => {
        return e;
      });
  }

  public put<T = any, P = any>(
    url: { path: string; baseURL: string } | string,
    data?: P,
    params?: Record<string, any>,
    config?: any
  ): Promise<any> {
    const joinQueryArrayValues = params ? this.getQueryString(params, config?.joinQueryArrayValues) : null;
    const path = getBaseUrl(url, params, joinQueryArrayValues);

    return instance
      .put<T>(path, data, { ...config, ...headers })
      .then(onFulfilled)
      .catch((e: Error) => {
        return e;
      });
  }

  public delete<T = any>(
    url: { path: string; baseURL: string } | string,
    params?: Record<string, any>,
    config?: any
  ): Promise<any> {
    const joinQueryArrayValues = params ? this.getQueryString(params, config?.joinQueryArrayValues) : null;
    const path = getBaseUrl(url, params, joinQueryArrayValues);

    return instance.delete<T>(path, { ...config, ...headers }).then(onFulfilled);
  }

  public getQueryString(params: Record<string, any>, joinArrayValues = false): string {
    return Object.entries(params)
      .filter(([_, value]) => filterValue(value))
      .map(([key, value]) => {
        if (!Array.isArray(value)) {
          return key + '=' + encodeURIComponent(value);
        } else if (joinArrayValues) {
          return (
            key +
            '=' +
            value
              .filter(filterValue)
              .map((item) => encodeURIComponent(item))
              .join(',')
          );
        } else {
          return value
            .filter(filterValue)
            .map((item) => `${key}[]` + '=' + encodeURIComponent(item))
            .join('&');
        }
      })
      .filter(Boolean)
      .join('&');
  }

  public isOkStatus(status: number): boolean {
    return SUCCESS_STATUSES.includes(status);
  }
}

export default new HttpClient();
