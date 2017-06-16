import * as _ from "lodash";
import {Injectable, ErrorHandler} from "@angular/core";

@Injectable()
export class Tm2ExceptionHandler extends ErrorHandler {

    private static agents: IssueAgent[] = [];

    public static registerAgent(agent: IssueAgent | IssueAgent[]): void {
        if (isIssueAgent(agent)) {
            if (!_.find(Tm2ExceptionHandler.agents, agent)) {
                Tm2ExceptionHandler.agents.push(agent);
            }

        } else if (agent) {
            agent.forEach(Tm2ExceptionHandler.registerAgent);
        }
    }

    constructor() {
        super();
    }

    public handleError(error, stackTrace = null, reason = null) {
        const issue: Issue = { error: error, reason: reason, stackTrace: stackTrace };

        Tm2ExceptionHandler.agents
            .filter(agent => issue && agent.manages(issue))
            .forEach(agent => agent.tackle(issue));
    }

}

export interface Issue {
    error;
    reason;
    stackTrace;
}

@Injectable()
export class IssueAgent {

    public manages(issue: Issue): boolean {
        return false;
    }

    public tackle(issue: Issue): void {
        return;
    }

}

function isIssueAgent(object: Object): object is IssueAgent {
    return object && (<IssueAgent>object).manages !== undefined && (<IssueAgent>object).tackle !== undefined;
}
