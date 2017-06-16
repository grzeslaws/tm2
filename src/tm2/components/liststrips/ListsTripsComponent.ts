import {Component} from "@angular/core";
import { ListsTrips } from './../../models/liststrips/ListsTrips';
import { ListsTripsService } from './../../services/liststrips/ListsTripsService';
import { Observable } from "rxjs/Rx";
import { ActivatedRoute} from "@angular/router";

@Component({
    selector: "lists-trips",
    templateUrl: "./ListsTrips.html",
    providers: [ListsTripsService]
})

export class ListsTripsComponent {

    example: ListsTrips;

    constructor(private listsTripsService: ListsTripsService){
        
    }

    ngOnInit(){
        this.listsTripsService.getListsTrips("valid1").subscribe(
            res => this.example = res
        )
    } 
}

