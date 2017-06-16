export interface Appender {
    consume(): void;
}

export function isAppender(/*tslint:disable no-any*/ object: any /*tslint:enable no-any*/): object is Appender {
    return (<Appender>object).consume !== undefined;
}
