import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { ListsTrips } from './../../models/liststrips/ListsTrips';
import { JsonParser} from "../jsonparser/JsonParser";
import 'rxjs/add/operator/map';

@Injectable()
export class ListsTripsService {

    public dupa: Array<any> = ["jeden", "dwa"]

    constructor(private jsonParser: JsonParser) {}

    //  getListsTrips() {
    //     return this.dupa
    // }

     getListsTrips(jsonType: userJson): Observable<ListsTrips> {
        return Observable.of(this.jsonParser.parse(ListsTrips, userJson[jsonType]));
    }
}


export type userJson = "valid1" | "valid2";

export const userJson = {
    valid1: {
        id: 1,
        mandatoryEmbedded: [
            {
                id: 1,
                date: "2017-06-15",
                status: "Trwa",
                score: 6,
                distance: 75,
                time: 5.34,
                startAdress: "Warszawa, ul. Puławska 12",
                endAdress: "Kraków, ul. Warszawska 34"
            },
            {
                id: 1,
                date: "2017-06-15",
                status: "Trwa",
                score: 6,
                distance: 75,
                time: 5.34,
                startAdress: "Warszawa, ul. Puławska 12",
                endAdress: "Kraków, ul. Warszawska 34"
            },
            {
                id: 1,
                date: "2017-06-15",
                status: "Trwa",
                score: 6,
                distance: 75,
                time: 5.34,
                startAdress: "Warszawa, ul. Puławska 12",
                endAdress: "Kraków, ul. Warszawska 34"
            },
            {
                id: 1,
                date: "2017-06-15",
                status: "Trwa",
                score: 6,
                distance: 75,
                time: 5.34,
                startAdress: "Warszawa, ul. Puławska 12",
                endAdress: "Kraków, ul. Warszawska 34"
            }
        ]
    }
}