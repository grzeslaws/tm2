import { AuthService } from './../../services/auth/AuthService';
import {Injectable} from "@angular/core";
import {RequestOptionsArgs, Headers} from "@angular/http";
import {PreProcessor} from "./RequestPreProcessor";

@Injectable()
export class AuthPreprocessor implements PreProcessor {

    process(url: string, options?: RequestOptionsArgs): [string, RequestOptionsArgs] {
        if (!options) {
            options = {};
        }

        if (!options.headers) {
            options.headers = new Headers();
        }

        const authToken = localStorage.getItem(AuthService.AUTH_TOKEN)
        if (authToken != null) {
            options.headers.set("X-Sparkbit-Auth-Token", authToken);
        }

        return [url, options];
    }
}