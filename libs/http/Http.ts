import axios, { AxiosRequestConfig } from 'axios';
import { HttpOptions as Options } from './HttpOptions';
import { HttpResponse } from './HttpResponse';

/**
 * A client for executing HTTP requests
 */
export class Http {

    host: string;
    defaultHeaders?: any;

    /**
     * Instantiates a client
     * @param host The target host
     * @param defaultHeaders The headers to append to the request
     */
    constructor(host: string, defaultHeaders?: string) {
        this.host = host;
        this.defaultHeaders = defaultHeaders || {};
    }

    /**
     * Sends a HTTP request to the target endpoint
     * @param options An object containing optional configurations to build the request
     */
    request(options: Options): Promise<HttpResponse> {

        let { target, method, body, queryString, headers, contentType } = options;

        target = `${this.host}${target}`;

        switch (contentType) {
            case 'form':
                this.defaultHeaders['Content-Type'] = 'application/x-www-form-urlencoded';
                break;
            default:
                this.defaultHeaders['Content-Type'] = 'application/json';
                break;
        }

        for (let headerName in headers) {
            this.defaultHeaders[headerName] = headers[headerName];
        }

        return new Promise(async (resolve, reject) => {
            const config: AxiosRequestConfig = {
                baseURL: this.host,
                url: target,
                method,
                headers: this.defaultHeaders,
            }
            if (body) {
                config.data = body;
            }
            if (queryString) {
                config.params = queryString;
            }
            axios
                .request(config)
                .then((response: any) => {
                    resolve(response);
                })
                .catch((e: Error) => reject(e));
        });
    }

    /**
     * Sends an HTTP GET request
     * @param url The target URL
     * @param headers The request headers
     * @param params Params to be send on the query string
     * @param type The content-type
     */
    get(url: string, headers?: any, params?: any, type?: string): Promise<HttpResponse> {
        return this.request(new Options('GET', url, null, params, headers, type));
    }

    /**
     * Sends an HTTP POST request
     * @param url The target URL
     * @param body The request body
     * @param headers The request headers
     * @param params Params to be send on the query string
     * @param type The content-type
     */
    post(url: string, body: any, headers?: any, params?: any, type?: string): Promise<HttpResponse> {
        return this.request(new Options('POST', url, body, params, headers, type));
    }

    /**
     * Sends an HTTP PUT request
     * @param url The target URL
     * @param body The request body
     * @param headers The request headers
     * @param params Params to be send on the query string
     * @param type The content-type
     */
    put(url: string, body: any, headers?: any, params?: any, type?: string): Promise<HttpResponse> {
        return this.request(new Options('PUT', url, body, params, headers, type));
    }

    /**
     * Sends an HTTP PATCH request
     * @param url The target URL
     * @param body The request body
     * @param headers The request headers
     * @param params Params to be send on the query string
     * @param type The content-type
     */
    patch(url: string, body: any, headers?: any, params?: any, type?: string): Promise<HttpResponse> {
        return this.request(new Options('PATCH', url, body, params, headers, type));
    }

    /**
     * Sends an HTTP DELETE request
     * @param url The target URL
     * @param headers The request headers
     * @param params Params to be send on the query string
     * @param type The content-type
     */
    delete(url: string, headers?: any, params?: any, type?: string): Promise<HttpResponse> {
        return this.request(new Options('DELETE', url, null, params, headers, type));
    }

    /**
     * Mocks a success HTTP GET request with randomized response callback.
     * @param responseBody The expected response
     */
    mockSuccess(responseBody: any): Promise<HttpResponse> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const response = {
                    status: 200,
                    statusText: "SUCCESS",
                    headers: "",
                    config: "",
                    baseURL: "",
                    timeout: 0,
                    method: "GET",
                    data: responseBody
                };
                resolve(response);
            }, Math.floor(Math.random() * 3) * 1000)
        });
    }

    /**
     * Mocks a failed HTTP GET request with randomized response callback.
     * @param errorCode Optional, the expected error code
     * @param errorMessage Optional, the expected error message
     */
    mockFailed(errorCode?: number, errorMessage?: string): Promise<HttpResponse> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const response = {
                    status: errorCode || 401,
                    statusText: errorMessage || "Not authorized",
                    headers: "",
                    config: "",
                    baseURL: "",
                    timeout: 0,
                    method: "GET",
                    data: null
                };
                reject(response);
            }, Math.floor(Math.random() * 3) * 1000)
        });
    }
}