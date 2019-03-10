import { AxiosRequestConfig, AxiosResponse } from 'axios';

interface IParams {
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

interface IResponseStatus {
    response: null | AxiosResponse;
    error: null | Error;
    loading: boolean;
}

interface IReturns extends IResponseStatus {
    /**
     * @deprecated Alias of `reFetch`
     */
    query: () => number;
    reFetch: () => number;
}

declare const useAxios: (params: IParams) => IReturns;
export default useAxios;
