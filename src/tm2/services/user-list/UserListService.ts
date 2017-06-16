import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { UserList } from "../../models/user-list/UserList";
import { User } from "../../models/testModel/testA";
import { JsonParser} from "../jsonparser/JsonParser";
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';


@Injectable()
export class UserListService {

    constructor(private jsonParser: JsonParser, private http: Http) {}

     getUserList(jsonType: userJson): Observable<UserList> {
        return Observable.of(this.jsonParser.parse(UserList, userJson[jsonType]));
    }

    getUserTest(){
        return Observable.of(userJson.valid1.mandatoryEmbedded)
    }



     getUserDetail(): Observable<User[]> {
            const url = 'http://jsonplaceholder.typicode.com/users/';
            return this.http.get(url).map(
            res => this.jsonParser.parseArray(User, res.json())
        )
    }


    //   getUserDetail(): Observable<Main> {
    //         const url = 'http://jsonplaceholder.typicode.com/users/';
    //         return this.http.get(url).map(
    //         res => {
    //             const user = res.json();
    //             return user;
    //         }
    //     )
    // }

    

}


export type userJson = "valid1" | "valid2";

export const userJson = {
    valid1: {
        id: 1,
        mandatoryEmbedded: [
            {
                id: 1,
                name: "Zenek",
                score: 7,
                distance: 85,
                time: 7.34,
                amountTrips: 45
            },
            {
                id: 2,
                name: "Zenek",
                score: 7,
                distance: 85,
                time: 7.34,
                amountTrips: 45
            },
            {
                id: 3,
                name: "Zenek",
                score: 7,
                distance: 85,
                time: 7.34,
                amountTrips: 45
            },
            {
                id: 4,
                name: "Zenek",
                score: 7,
                distance: 85,
                time: 7.34,
                amountTrips: 45
            },
            {
                id: 5,
                name: "Zenek",
                score: 7,
                distance: 85,
                time: 7.34,
                amountTrips: 45
            },
            {
                id: 6,
                name: "Zenek",
                score: 7,
                distance: 85,
                time: 7.34,
                amountTrips: 45
            },
            {
                id: 7,
                name: "Zenek",
                score: 7,
                distance: 85,
                time: 7.34,
                amountTrips: 45
            },
            {
                id: 8,
                name: "Zenek",
                score: 7,
                distance: 85,
                time: 7.34,
                amountTrips: 45
            },
            {
                id: 9,
                name: "Zenek",
                score: 7,
                distance: 85,
                time: 7.34,
                amountTrips: 45
            },
            {
                id: 10,
                name: "Zenek",
                score: 7,
                distance: 85,
                time: 7.34,
                amountTrips: 45
            },
            {
                id: 11,
                name: "Zenek",
                score: 7,
                distance: 85,
                time: 7.34,
                amountTrips: 45
            },
            {
                id: 12,
                name: "Zenek",
                score: 7,
                distance: 85,
                time: 7.34,
                amountTrips: 45
            },
            {
                id: 13,
                name: "Zenek",
                score: 7,
                distance: 85,
                time: 7.34,
                amountTrips: 45
            },
            {
                id: 14,
                name: "Zenek",
                score: 7,
                distance: 85,
                time: 7.34,
                amountTrips: 45
            },
            {
                id: 15,
                name: "Zenek",
                score: 7,
                distance: 85,
                time: 7.34,
                amountTrips: 45
            },
            {
                id: 16,
                name: "Zenek",
                score: 7,
                distance: 85,
                time: 7.34,
                amountTrips: 45
            },
            {
                id: 17,
                name: "Zenek",
                score: 7,
                distance: 85,
                time: 7.34,
                amountTrips: 45
            },
            {
                id: 18,
                name: "Zenek",
                score: 7,
                distance: 85,
                time: 7.34,
                amountTrips: 45
            },
            {
                id: 19,
                name: "Zenek",
                score: 7,
                distance: 85,
                time: 7.34,
                amountTrips: 45
            },
            {
                id: 20,
                name: "Zenek",
                score: 7,
                distance: 85,
                time: 7.34,
                amountTrips: 45
            },
            {
                id: 21,
                name: "Zenek",
                score: 7,
                distance: 85,
                time: 7.34,
                amountTrips: 45
            },
            {
                id: 22,
                name: "Zenek",
                score: 7,
                distance: 85,
                time: 7.34,
                amountTrips: 45
            },
            {
                id: 23,
                name: "Zenek",
                score: 7,
                distance: 85,
                time: 7.34,
                amountTrips: 45
            },
            {
                id: 24,
                name: "Zenek",
                score: 7,
                distance: 85,
                time: 7.34,
                amountTrips: 45
            },
            {
                id: 25,
                name: "Zenek",
                score: 7,
                distance: 85,
                time: 7.34,
                amountTrips: 45
            },
            {
                id: 26,
                name: "Zenek",
                score: 7,
                distance: 85,
                time: 7.34,
                amountTrips: 45
            },
            {
                id: 27,
                name: "Zenek",
                score: 7,
                distance: 85,
                time: 7.34,
                amountTrips: 45
            },
            {
                id: 28,
                name: "Zenek",
                score: 7,
                distance: 85,
                time: 7.34,
                amountTrips: 45
            },
            {
                id: 29,
                name: "Zenek",
                score: 7,
                distance: 85,
                time: 7.34,
                amountTrips: 45
            },
            {
                id: 30,
                name: "Zenek",
                score: 7,
                distance: 85,
                time: 7.34,
                amountTrips: 45
            },
            {
                id: 31,
                name: "Zenek",
                score: 7,
                distance: 85,
                time: 7.34,
                amountTrips: 45
            },
            {
                id: 32,
                name: "Zenek",
                score: 7,
                distance: 85,
                time: 7.34,
                amountTrips: 45
            },
            {
                id: 33,
                name: "Zenek",
                score: 7,
                distance: 85,
                time: 7.34,
                amountTrips: 45
            },
            {
                id: 34,
                name: "Zenek",
                score: 7,
                distance: 85,
                time: 7.34,
                amountTrips: 45
            },
            {
                id: 35,
                name: "Zenek",
                score: 7,
                distance: 85,
                time: 7.34,
                amountTrips: 45
            },
            {
                id: 36,
                name: "Zenek",
                score: 7,
                distance: 85,
                time: 7.34,
                amountTrips: 45
            },
            {
                id: 37,
                name: "Zenek",
                score: 7,
                distance: 85,
                time: 7.34,
                amountTrips: 45
            },
            {
                id: 38,
                name: "Zenek",
                score: 7,
                distance: 85,
                time: 7.34,
                amountTrips: 45
            },
            {
                id: 39,
                name: "Zenek",
                score: 7,
                distance: 85,
                time: 7.34,
                amountTrips: 45
            },
            {
                id: 40,
                name: "Zenek",
                score: 7,
                distance: 85,
                time: 7.34,
                amountTrips: 45
            }
        ]
    }

    // valid2: {
    //     id: 1,
    //     mandatoryEmbedded: [
    //         {
    //             id: 1,
    //             ocena: 7.8,
    //             date: "2017-06-15",
    //             optionalName: "first object in mandatory list"
    //         },
    //         {
    //             id: 3,
    //             ocena: 7.8,
    //             date: "2017-06-15",
    //             optionalName: "first object in mandatory list"
    //         }
    //     ],
    //     optionalEmbedded: [
    //         {
    //             id: 2,
    //             ocena: 7.8,
    //             date: "2017-06-15",
    //             optionalName: "first object in optional list"
    //         }
    //     ]
    // }
}

// export const userJson = [{
//     id: 1,
//     name: "name",
//     lastName: "last name",
//     quantityOfTrips: '12',
//     startAdress: 'Marszałkowska 12, Warszawa'
// },
// {
//     id: 2,
//     name: "name1",
//     lastName: "last 2name",
//     quantityOfTrips: '312',
//     startAdress: 'Marszeałkowska 12, Warszawa'
// }]