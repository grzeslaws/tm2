import {Model} from "../../services/jsonparser/decorators/Model";
import {Field} from "../../services/jsonparser/decorators/Field";
import {DateClass} from "../../models/jsonparser/DateClass";

@Model()
export class ListsTripsFields {

    constructor
        (
            @Field("id") public id: number,
            @Field("date") public date: DateClass,
            @Field("status") public status: string,
            @Field("score") public score: number,
            @Field("distance") public distance: number,
            @Field("time") public time: number,
            @Field("startAdress") public startAdress: string,
            @Field("endAdress") public endAdress: string
        ) 
    {}
}

