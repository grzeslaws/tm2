import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { User } from "../../models/user/User";
import { JsonParser} from "../jsonparser/JsonParser";

@Injectable()
export class UserService {

    constructor(private jsonParser: JsonParser) {}

    getUser(id: number): Observable<User> {
        return this.getUserMocked(id).map(
            userJson => 
                this.jsonParser.parse(User, userJson)
        )
    }

    private getUserMocked(id: number): Observable<any>{
        return Observable.of(userJson);

    }
}

const userJson = {
    id: 1,
    name: "name",
    lastName: "last name",
    score: 7.9,
        scoreDetail: {
            event1: 9.1,
            event2: 8.8,
            event3: 7.4,
            event4: 5.7,
            event5: 4.2
        },
    distance: 354,
    amountTrips: 74300
}