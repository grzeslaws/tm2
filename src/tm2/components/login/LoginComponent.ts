import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth/AuthService";
import {Credentials} from "../../models/auth/Credentials";

@Component({
    selector: "login",
    templateUrl: "./login.html"
})
export class LoginComponent {

    email: string;
    password: string;

    constructor(private router: Router, private authService: AuthService) {}

    login() {
        this.authService.login(new Credentials(this.email, this.password))
            .first()
            .subscribe(() => this.router.navigate(["/", "deviceValuation"]));
    }

    logout() {
        this.authService.logout();
    }
}