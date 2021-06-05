import { fetch } from './fetch';
import { AxiosResponse } from 'axios';

export async function sendPing(): Promise<AxiosResponse<string>> {
  try {
    return fetch('/pong', 'GET', null);
  } catch (err) {
    console.log(err);
    return err;
  }
}
