import {LogLevel} from "./LogLevel";

export class LogEntry {
    constructor(public level: LogLevel,
        public message: string,
        public details: string,
        public postToBackend: boolean,
        public showInUI: boolean) {}
}
