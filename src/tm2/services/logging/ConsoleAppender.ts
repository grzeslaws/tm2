import {Injectable} from "@angular/core";
import {LogLevel} from "./LogLevel";
import {Logger} from "./Logger";
import {Appender} from "./Appender";

@Injectable()
export class ConsoleAppender implements Appender {

    constructor(private log: Logger) {}

    public consume(): void  {
        this.log.stream.subscribe(logEntry => {
            const console = window.console;

            if (console) {
                const message = logEntry.message;
                const details = !!logEntry.details ? "\n" + logEntry.details : logEntry.details;

                if (logEntry.level === LogLevel.ERROR && console.error) {
                    console.error(message, details);

                } else if (logEntry.level === LogLevel.INFO && console.info) {
                    /*tslint:disable no-console*/
                    console.info(message, details);
                    /*tslint:enable no-console*/

                } else if (console.log) {
                    console.log(message, details);
                }
            }
        });
    }

}
