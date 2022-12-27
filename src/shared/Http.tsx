import axios,{AxiosError,AxiosInstance,AxiosRequestConfig,AxiosRequestHeaders} from "axios";
type JSONValue=string | number | null | boolean | JSONValue[] | {[key:string]:JSONValue};
export class Http{
    instance:AxiosInstance;
    constructor(baseURL:string){

    }
}