import { userJson } from './../../services/user-list/UserListService';
import { UserList } from './../../models/user-list/UserList';
import {Component} from "@angular/core";
import { Observable } from "rxjs/Rx";
import { User } from "../../models/user/User";
import {UserService} from "../../services/user/UserService";
import { ActivatedRoute} from "@angular/router";

@Component({
    selector: "user",
    templateUrl: "./user.html"
})

export class UserComponent {

    public user: User;
    public id: number;

    constructor(private activeRoute: ActivatedRoute, private userService: UserService){}

    ngOnInit(){

      this.id = this.activeRoute.snapshot.params['id'];

        this.userService.getUser(1).subscribe(
            res => this.user = res   
        )
    }
}

