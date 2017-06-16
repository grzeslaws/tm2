import {Component} from "@angular/core";
import {I18NService} from "../services/i18n/I18NService";
import {Logger} from "../services/logging/Logger";
import {ConsoleAppender} from "../services/logging/ConsoleAppender";
import {Tm2ExceptionHandler, IssueAgent} from "../utilities/Tm2ExceptionHandler";

@Component({
    selector: "tm2",
    template: `<main-menu></main-menu>
               <router-outlet></router-outlet>
               `
})
export class Tm2Component {

    constructor(private i18nService: I18NService, consoleAppender: ConsoleAppender, agent: IssueAgent) {
        const availableLanguages = ["en", "pl"];
        const defaultLanguage = "pl";
        let preferredLanguage = i18nService.getPreferredLanguage();

        if (preferredLanguage === null) {
            preferredLanguage = defaultLanguage;
        }

        Tm2ExceptionHandler.registerAgent(agent);
        Logger.configure(consoleAppender);

        this.i18nService.configure({
            availableLanguages: availableLanguages,
            defaultLanguage: defaultLanguage,
            preferredLanguage: preferredLanguage
        });
    }
}
