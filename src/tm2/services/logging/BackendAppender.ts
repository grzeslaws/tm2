import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {LogLevel} from "./LogLevel";
import {Logger} from "./Logger";
import {Appender} from "./Appender";

@Injectable()
export class BackendAppender implements Appender {
    constructor(private http: Http, private log: Logger, private endpoint: string) {}
    public consume() {
        this.log.stream
            .filter(logEntry => logEntry.postToBackend)
            .subscribe(logEntry => {
                this.http.post(this.endpoint, JSON.stringify({message: logEntry.message, details: logEntry.details})).subscribe(
                    (r: Response) => r,
                    (err: Response) => {
                        this.log.log(LogLevel.ERROR, "Call to " + err.url + " failed with status " + err.status, err.text(), false, false);
                    }
            );
        });
    }
}
