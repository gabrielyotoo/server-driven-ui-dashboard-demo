import axios, { type AxiosInstance, type AxiosResponse } from 'axios';

export class AxiosClient {
  instance: AxiosInstance;

  constructor() {
    this.instance = axios.create();

    this.instance.interceptors.response.use(
      (r) => r,
      () => {
        // handle error
      },
    );
  }

  async get<R>(url: string, ...params: unknown[]): Promise<R> {
    const { data } = await this.instance.get<unknown, AxiosResponse<R>>(url, {
      params,
    });

    return data;
  }

  async post<T, R>(url: string, body: T, ...params: unknown[]): Promise<R> {
    const { data } = await this.instance.post<T, AxiosResponse<R>>(url, body, {
      params,
    });

    return data;
  }

  async put<T, R>(url: string, body: T, ...params: unknown[]): Promise<R> {
    const { data } = await this.instance.put<T, AxiosResponse<R>>(url, body, {
      params,
    });

    return data;
  }
}
