import { AxiosRequestConfig, AxiosResponse } from 'axios';

interface IParams {
    url: string;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'PATCH';
    options?: AxiosRequestConfig;
    trigger?: object | string;
    filter?: () => boolean;
    customHandler?: (error: null | Error, response: null | AxiosResponse) => void;
}

interface IResponseStatus {
    response: null | AxiosResponse;
    error: null | Error;
    loading: boolean;
}

interface IReturns extends IResponseStatus {
    query: () => number;
}

declare const useAxios: (params: IParams) => IReturns;
export default useAxios;
