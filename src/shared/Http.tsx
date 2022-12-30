import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from "axios";
import { mockItemCreate, mockSession, mockTagIndex } from "../mock/mock";
type JSONValue = string | number | null | boolean | JSONValue[] | { [key: string]: JSONValue };
type GetConfig = Omit<AxiosRequestConfig, 'params' | 'url' | 'method'>;
type PostConfig = Omit<AxiosRequestConfig, 'url' | 'data' | 'method'>;
type PatchConfig = Omit<AxiosRequestConfig, 'url' | 'data'>;
type DeleteConfig = Omit<AxiosRequestConfig, 'params'>;
export class Http {
    instance: AxiosInstance;
    constructor(baseURL: string) {
        this.instance = axios.create({
            baseURL
        })
    }
    //read
    get<R = unknown>(url: string, query?: Record<string, JSONValue>, config?: GetConfig) {
        console.log(url);
        return this.instance.request<R>({ ...config, url: url, params: query, method: 'get' })
    }
    // create
    post<R = unknown>(url: string, data?: Record<string, JSONValue>, config?: PostConfig) {
        return this.instance.request<R>({ ...config, url, data, method: 'post' });
    }
    // update
    patch<R = unknown>(url: string, data?: Record<string, JSONValue>, config?: PatchConfig) {
        return this.instance.request<R>({ ...config, url, data, method: 'patch' });
    }
    // destroy
    delete<R = unknown>(url: string, query?: Record<string, string>, config?: DeleteConfig) {
        return this.instance.request<R>({ ...config, url: url, params: query, method: 'delete' })
    }
}
const mock = (response: AxiosResponse) => {
    if (location.hostname !== 'localhost'
        && location.hostname !== '127.0.0.1'
        && location.hostname !== '192.168.2.149') {
        return false;
    }
    switch (response.config?.params?._mock) {
        case 'tagIndex':
            [response.status, response.data] = mockTagIndex(response.config);
            return true;
        case 'session':
            [response.status, response.data] = mockSession(response.config);
            return true;
        case 'itemCreate':
            [response.status, response.data] = mockItemCreate(response.config);
            return true;

    }
    return false;
}
export const http = new Http('/api/v1');
http.instance.interceptors.request.use(config => {
  
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
        config.headers!.Authorization = `Bearer ${jwt}`;
    }
    return config;
})
http.instance.interceptors.response.use((response) => {
    mock(response);
    if (response.status >= 400) {
        throw { response };
    }
    else {
        return response;
    }
}, (error) => {
    mock(error.response);
    if (error.response.status >= 400) {
        throw error;
    }
    else {
        return error.response;
    }
})
http.instance.interceptors.response.use(
    response => { return response },
    error => {
        if (error.response) {
            const axiosError = error as AxiosError
            if (axiosError.response?.status === 429) {
                alert('你太频繁了')
            }
        }
        throw error
    }
)
