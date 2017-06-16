import {Injectable} from "@angular/core";
import {PreProcessor} from "./preprocessor/RequestPreProcessor";
import {AuthPreprocessor} from "./preprocessor/AuthPreprocessor";

@Injectable()
export class HttpInterceptorConfig {
    constructor(private authPreprocessor: AuthPreprocessor) {}

    preProcessors: PreProcessor[] = [this.authPreprocessor];
    postProcessors = [];
}