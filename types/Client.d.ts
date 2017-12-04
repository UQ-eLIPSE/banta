import { AxiosResponse as _AxiosResponse } from "axios";
export declare type AxiosResponse = _AxiosResponse;
export interface ClientOptions {
    host: string;
    user: string;
    subuser?: string;
    signing: {
        key: string;
        keyFingerprint: string;
    };
}
export interface QueryParameters {
    [key: string]: string | number;
}
export declare class Client {
    private readonly options;
    constructor(options: ClientOptions);
    readonly host: string;
    readonly user: string;
    readonly subuser: string | undefined;
    private constructFullUrl(path);
    private createHeadersObject();
    get(path: string, params?: QueryParameters, headers?: {
        [key: string]: string;
    }): Promise<_AxiosResponse<any>>;
    post(path: string, data: any, headers?: {
        [key: string]: string;
    }): Promise<_AxiosResponse<any>>;
    delete(path: string, headers?: {
        [key: string]: string;
    }): Promise<_AxiosResponse<any>>;
    put(path: string, data: any, headers?: {
        [key: string]: string;
    }): Promise<_AxiosResponse<any>>;
}
