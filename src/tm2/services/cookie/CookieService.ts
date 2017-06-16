export class CookieService {

    public setCookie(name: string, value: string, expires?: Date) {
        let expiration = expires ? "; expires=" + expires.toUTCString() : "";
        document.cookie = `${name}=${value}${expiration}`;
    }

    public getCookie(name: string): string {
        let cookie: string = document.cookie
            .split(";")
            .map(cookieStr => cookieStr.trim())
            .find(cookieStr => cookieStr.startsWith(name + "="));

        return cookie ? cookie.replace(name + "=", "") : null;
    }

    public clearCookie(name: string) {
        this.setCookie(name, "");
    }
}
