import {Model} from "../../services/jsonparser/decorators/Model";
import {Field} from "../../services/jsonparser/decorators/Field";
import {DateClass} from "../../models/jsonparser/DateClass";

@Model()
export class UserListFields {

    constructor
        (
        @Field("id") public id: number,
        @Field("name") public name: string,
        @Field("score") public score: number,
        @Field("distance") public distance: number,
        @Field("time") public time: number,
        @Field("amountTrips") public amountTrips: number
        ) {}
}

