import {RequestOptionsArgs} from "@angular/http";

export interface PreProcessor {
    process: (url: string, options?: RequestOptionsArgs) => [string, RequestOptionsArgs];
}