import { Example } from './../../models/example/Example';
import { UserService } from './../../services/user/UserService';
import { User } from "../../models/user/User";
import { Component,  ElementRef } from '@angular/core';

@Component({
    selector: "lists-trips",
    templateUrl: "./userScoreComponent.html",
    styleUrls: ["./userScoreComponent.css"],
    providers: [UserService]
})

export class UserScoreComponent {

    public example: User;
    public scorePercent: number;
    public rectWidth: number[];
    public arrayRec = [];

    private width100percent = 400;

    constructor(private userService: UserService, private elRef:ElementRef ){}

    ngOnInit(){
        this.userService.getUser(1).subscribe(
            res => this.example = res
        )

        let circleElement = this.elRef.nativeElement.querySelector('circle');
        let r = circleElement.getAttribute("r");
        let total = 2 * 3.14 * +r;
        let score = (this.example.score * total) / 10;
        this.scorePercent = Math.round(score);

        const ArrayRec = []

        const obj = this.example.scoreDetail

        for (let prop in obj) {
            ArrayRec.push(Math.round(obj[prop] * this.width100percent / 10));
            console.log(obj[prop])
        }

        this.arrayRec = ArrayRec;
    }

    toFixedMethod(val){
        return val.toFixed(1);
    }
}