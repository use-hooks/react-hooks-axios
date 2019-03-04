import { Method, AxiosRequestConfig, AxiosResponse } from 'axios';

type Returns = {
  response: AxiosResponse;
  error: object;
  loading: boolean;
  query: Function;
};

type Props = {
  url: string;
  method: Method;
  options?: AxiosRequestConfig;
  trigger?: object | string;
  filter: Function<Boolean>;
  customHandler?: (error: null | object, response: null | AxiosResponse) => null | object;
};

export default function useAxios(Props): Returns;

