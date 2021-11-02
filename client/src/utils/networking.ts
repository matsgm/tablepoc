import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export const fetcher = (url: string, config?: AxiosRequestConfig) =>
  Axios.get(url, config).then((res) => res.data);

export async function post<DataType, ResponseType>(
  url: string,
  data: DataType,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<ResponseType>> {
  try {
    const response: AxiosResponse = await Axios.post(url, data, config);
    return response as AxiosResponse<ResponseType>;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
