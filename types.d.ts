import { AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios';

export interface IParams<T> {
    axios?: AxiosInstance;
    url: string;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'PATCH';
    options?: AxiosRequestConfig;
    trigger?: object | string;
    /**
     * @deprecated Alias of `forceDispatchEffect`
     */
    filter?: () => boolean;
    forceDispatchEffect?: () => boolean;
    customHandler?: (error: null | Error, response: null | AxiosResponse<T>) => void;
}

export interface IResponseStatus<T> {
    response: null | AxiosResponse<T>;
    error: null | Error;
    loading: boolean;
}

export interface IReturns<T> extends IResponseStatus<T> {
    /**
     * @deprecated Alias of `reFetch`
     */
    query: () => number;
    reFetch: () => number;
}

declare const useAxios: <T = any>(params: IParams<T>) => IReturns<T>;
export default useAxios;

export declare const axios: AxiosInstance;
