import { AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios';

export interface IParams {
    axios: AxiosInstance;
    url: string;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'PATCH';
    options?: AxiosRequestConfig;
    trigger?: object | string;
    /**
     * @deprecated Alias of `forceDispatchEffect`
     */
    filter?: () => boolean;
    forceDispatchEffect?: () => boolean;
    customHandler?: (error: null | Error, response: null | AxiosResponse) => void;
}

export interface IResponseStatus {
    response: null | AxiosResponse;
    error: null | Error;
    loading: boolean;
}

export interface IReturns extends IResponseStatus {
    /**
     * @deprecated Alias of `reFetch`
     */
    query: () => number;
    reFetch: () => number;
}

declare const useAxios: (params: IParams) => IReturns;
export default useAxios;

export declare const axios: AxiosInstance;
