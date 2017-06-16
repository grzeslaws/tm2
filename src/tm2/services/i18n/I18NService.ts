import {Injectable} from "@angular/core";
import {CookieService} from "../cookie/CookieService";
import {Logger} from "../logging/Logger";

const I18N_PREFERRED_LANGUAGE_COOKIE_NAME = "preferredLanguage";

@Injectable() export class I18NService {
    private preferredLanguage: string;
    private availableLanguages: Array<string> = [];
    private defaultLanguage = "en";
    private expirationDays = 10;

    constructor(private cookieService: CookieService, private logger: Logger) {
        this.preferredLanguage = cookieService.getCookie(I18N_PREFERRED_LANGUAGE_COOKIE_NAME);
    }

    public configure(configuration: I18NConfiguration): void {
        if (configuration.availableLanguages.indexOf(configuration.defaultLanguage) === -1) {
            throw new Error("[TRANSLATION ERROR]: Default language does not figure on available languages list!");
        }

        if (configuration.availableLanguages.indexOf(configuration.preferredLanguage) === -1) {
            throw new Error("[TRANSLATION ERROR]: Preferred language does not figure on available languages list!");
        }

        this.availableLanguages = configuration.availableLanguages;
        this.defaultLanguage = configuration.defaultLanguage;
        this.preferredLanguage = configuration.preferredLanguage;

        if (configuration.hasOwnProperty("expirationDays")) {
            /* tslint:disable: no-string-literal */
            this.expirationDays = configuration["expirationDays"];
            /* tslint:enable: no-string-literal */
        }

        this.setPreferredLanguage(this.preferredLanguage);
    }

    public getPreferredLanguage(): string {
        return this.preferredLanguage;
    }

    public setPreferredLanguage(preferredLanguage: string): void {
        if (this.availableLanguages.indexOf(preferredLanguage) === -1) {
            this.logger.debug("[TRANSLATION WARNING]: Preferred language: '" + preferredLanguage + "' does not figure on available languages list!");
            preferredLanguage = this.defaultLanguage;
        }

        if (this.getPreferredLanguage() !== preferredLanguage) {
            this.setI18NCookie(I18N_PREFERRED_LANGUAGE_COOKIE_NAME, preferredLanguage);
            this.preferredLanguage = preferredLanguage;
        }
    }

    public extractCurrentTranslation(i18n): Object {
        return Object.assign(i18n[this.defaultLanguage], i18n[this.preferredLanguage]);
    }

    private setI18NCookie(name: string, value: string): void {
        let expirationDate = new Date();
        expirationDate.setTime(expirationDate.getTime() + (this.expirationDays * 24 * 60 * 60 * 1000));

        this.cookieService.setCookie(name, value, expirationDate);
    }
}

export interface I18NConfiguration {
    availableLanguages: Array<string>;
    defaultLanguage: string;
    preferredLanguage: string;
    expirationDays?: number;
};
