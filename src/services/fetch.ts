import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, Method } from 'axios';

import config from '../config';

type Headers = {
  [headerName: string]: string | void;
};

const instance: AxiosInstance = axios.create({
  baseURL: config.remoteUrl + '/api/',
});

export const buildUrl = (endpoint: string): string => `${config.remoteUrl}/api/${endpoint}`;

export const fetch = async <T>(
  url: string,
  method: Method,
  body?: any,
  options?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  if (!url) {
    throw new Error('No url defined');
  }

  const headers: Headers = options && options.headers ? options.headers : {};

  return instance.request({
    url: url,
    method,
    headers,
    data: body,
    ...options,
  });
};
