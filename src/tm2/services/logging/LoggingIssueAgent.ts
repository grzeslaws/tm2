import {Injectable} from "@angular/core";
import {Response} from "@angular/http";
import {Logger} from "./Logger";
import {IssueAgent, Issue} from "../../utilities/Tm2ExceptionHandler";

/*
Global exception interceptor that logs all uncaught exceptions to the logging service
*/
@Injectable()
export class LoggingIssueAgent extends IssueAgent {

    constructor(private log: Logger) {
        super();
    }

    public manages(issue: Issue): boolean {
        return true;
    }

    public tackle(issue: Issue) {
        /* tslint:disable:no-string-literal */
        let message = "";
        let details = "";
        const error = issue.error;
        const stackTrace = issue.stackTrace || error.stack;
        const isResponse = error instanceof Response;

        if (isResponse) {
            if (error.url && error.status !== 200) {
                message = "Call to '" + error.url + "' failed with status " + error.status;

            } else {
                message = "The requested operation could not be completed";
            }

            details = error.text();

        } else if (error instanceof Object) {
            if (error.hasOwnProperty("message")) {
                message = error["message"];
            }

            if (error.hasOwnProperty("reason")) {
                details = error["reason"];

            } else if (stackTrace) {
                if (typeof stackTrace === "string") {
                    details = stackTrace;

                } else if (stackTrace instanceof Array) {
                    const stacks = stackTrace.filter(s => s !== null);

                    if (stacks.length > 0) {
                        details = stacks.join("\n");
                    }
                }
            }
        }

        if (!message) {
            message = error + "";
        }

        this.log.error(message, details, !isResponse);
        /* tslint:enable:no-string-literal */
    }
}
