import {Injectable} from "@angular/core";
import {Http, Response, RequestOptionsArgs, ConnectionBackend, RequestOptions, Request} from "@angular/http";
import {Observable} from "rxjs/Rx";
import {HttpInterceptorConfig} from "./HttpInterceptorConfig";

//todo override 'resource' method
@Injectable()
export class HttpInterceptor extends Http {

    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions, private config: HttpInterceptorConfig) {
        super(backend, defaultOptions);
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.wrapWithNoBody(super.get, url, options);
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.wrapWithNoBody(super.delete, url, options);
    }

    head(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.wrapWithNoBody(super.head, url, options);
    }

    post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        return this.wrapWithBody(super.post, url, body, options);
    }

    put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        return this.wrapWithBody(super.put, url, body, options);
    }

    patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        return this.wrapWithBody(super.patch, url, body, options);
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        if (typeof url === "string") {
            if (options) {
                options.withCredentials = true;
            } else {
                options = {withCredentials: true};
            }
        } else {
            url.withCredentials = true;
        }

        return super.request(url, options);
    }

    private preProcess(url: string, options?: RequestOptionsArgs): [string, RequestOptionsArgs] {
        return this.config.preProcessors.reduce(
            ([previousUrl, previousOptions], processor) => processor.process(previousUrl, previousOptions),
                <[string, RequestOptionsArgs]> [url, options]);
    }

    private postProcess(resp: Response): Response {
        return this.config.postProcessors.reduce((prevResp, processor) => processor(prevResp), resp);
    }

    private wrapWithNoBody(httpServiceMethod: (url: string, options?: RequestOptionsArgs) => Observable<Response>,
                           url: string, options?: RequestOptionsArgs): Observable<Response> {
        let processed = this.preProcess(url, options);
        return httpServiceMethod.call(this, processed[0], processed[1]).map((r: Response) => this.postProcess(r));
    }

    private wrapWithBody(httpServiceMethod: (url: string, body: any, options?: RequestOptionsArgs) => Observable<Response>,
                         url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        let processed = this.preProcess(url, options);
        //FIXME it would be nicer to have a dedicated preprocessor to add the header
        if (!(body instanceof FormData)) {
            processed[1].headers.append("Content-Type", "application/json");
        }
        return httpServiceMethod.call(this, processed[0], body, processed[1]).map((r: Response) => this.postProcess(r));
    }
}