import { AuthPreprocessor } from './../../http/preprocessor/AuthPreprocessor';
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Rx";
import {Credentials} from "../../models/auth/Credentials";
import {Token} from "../../models/token/Token";
import {CONFIG} from "../config";


@Injectable()
export class AuthService {
  static AUTH_TOKEN = "authToken";

  constructor(private http: Http) {
  }

  login(credentials: Credentials): Observable<Token> {

    let payload = {
        "password": credentials.password,
        "authnAttributes": {
            "email": credentials.email,
            "applicationName": CONFIG.applicationName
        }
    }

    return this.http.post(CONFIG.loginEndpoint(), payload)
      .do(resp => {
        localStorage.setItem(AuthService.AUTH_TOKEN, resp.headers.get("Authorization"));
      })
      .map(() => Token.TOKEN);
  }

   logout() {
    localStorage.removeItem(AuthService.AUTH_TOKEN);
  }

  isLoggedIn() {
    return !!localStorage.getItem(AuthService.AUTH_TOKEN);
  }

}