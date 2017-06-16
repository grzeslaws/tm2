import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs/Rx";
import {LogLevel} from "./LogLevel";
import {LogEntry} from "./LogEntry";
import {Appender, isAppender} from "./Appender";

@Injectable()
export class Logger {
    private logSubject = new Subject<LogEntry>();

    public static configure(appenders: Appender[] | Appender) {
        if (isAppender(appenders)) {
            appenders.consume();

        } else {
            appenders.forEach(appender => appender.consume());
        }
    }

    public debug(message: string, details?: string) {
        this.log(LogLevel.DEBUG, message, details, false, false);
    }

    public info(message: string, details?: string, showInUI = false) {
        this.log(LogLevel.INFO, message, details, false, showInUI);
    }

    public error(message: string, details?: string, showInUI = false) {
        this.log(LogLevel.ERROR, message, details, true, showInUI);
    }

    public log(level: LogLevel, message: string, details: string, postToBackend = true, showInUI = false) {
        this.logSubject.next(new LogEntry(level, message, details, postToBackend, showInUI));
    }

    public get stream(): Observable<LogEntry> {
        return this.logSubject;
    }

}
