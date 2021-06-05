import { fetch } from './fetch';
import { AxiosResponse } from 'axios';

export async function sendPing(): Promise<AxiosResponse<string>> {
  return fetch('/pong', 'GET', null);
}
