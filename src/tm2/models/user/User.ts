import {Model} from "../../services/jsonparser/decorators/Model";
import {Field} from "../../services/jsonparser/decorators/Field";

@Model()
export class scoreDetail {
 
    constructor(
        @Field("event1") public event1: number,
        @Field("event2") public event2: number,
        @Field("event3") public event3: number,
        @Field("event4") public event4: number,
        @Field("event5") public event5: number
        )
    {}
}

@Model()
export class User {
    constructor(
        @Field("id") public id: number, 
        @Field("name") public name: string, 
        @Field("lastName") public lastName: string,
        @Field("score") public score: number,
            @Field("scoreDetail") public scoreDetail: scoreDetail,
        @Field("distance") public distance: number,
        @Field("amountTrips") public amountTrips: number
    ) {} 
}
