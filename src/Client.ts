import { Signature } from "./Signature";

import axios, { AxiosResponse as _AxiosResponse } from "axios";

// Redirected import/export of the AxiosResponse type to satisfy the
// requirements for the generation of declaration files
export type AxiosResponse = _AxiosResponse;

export interface ClientOptions {
    host: string,
    user: string,
    subuser?: string,
    signing: {
        key: string,
        keyFingerprint: string,
    },
}

export interface QueryParameters {
    [key: string]: string | number,
}

export class Client {
    private readonly options: ClientOptions;

    constructor(options: ClientOptions) {
        this.options = options;
    }

    public get host() {
        return this.options.host;
    }

    public get user() {
        return this.options.user;
    }

    public get subuser() {
        return this.options.subuser;
    }

    private constructFullUrl(path: string) {
        return `${this.options.host}${path}`;
    }

    private createHeadersObject() {
        const user = this.options.user;
        const subuser = this.options.subuser;
        const key = this.options.signing.key;
        const fingerprint = this.options.signing.keyFingerprint;
        const algorithm = "rsa-sha256";

        // Signing strings
        const dateHeaderValue = Signature.createDateHeaderString();
        const keyId = Signature.createKeyId(user, subuser, fingerprint);
        const stringToSign =
            Signature.prefixDateHeaderStringWithDateHeaderKey(dateHeaderValue);

        // Generating signature and auth header
        const signature = Signature.generateSignature(algorithm, key, stringToSign);
        const authHeaderValue =
            Signature.createAuthorizationHeaderString(keyId, algorithm, signature);

        return {
            // We need both the "date" and "Authorization" headers at a minimum
            // in all requests
            "date": dateHeaderValue,
            "Authorization": authHeaderValue,

            // TODO: `Role` header
        };
    }

    public async get(path: string, params?: QueryParameters, headers: { [key: string]: string } = {}) {
        headers = { ...headers, ...this.createHeadersObject() };

        return await axios.get(this.constructFullUrl(path), {
            headers,
            params,
        });
    }

    public async post(path: string, data: any, headers: { [key: string]: string } = {}) {
        headers = { ...headers, ...this.createHeadersObject() };

        return await axios.post(this.constructFullUrl(path), data, {
            headers,
        });
    }

    public async delete(path: string, headers: { [key: string]: string } = {}) {
        headers = { ...headers, ...this.createHeadersObject() };

        return await axios.delete(this.constructFullUrl(path), {
            headers,
        });
    }

    public async put(path: string, data: any, headers: { [key: string]: string } = {}) {
        headers = { ...headers, ...this.createHeadersObject() };

        return await axios.put(this.constructFullUrl(path), data, {
            headers,
        });
    }
}
