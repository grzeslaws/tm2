import {Model} from "../../services/jsonparser/decorators/Model";
import {Field} from "../../services/jsonparser/decorators/Field";
import {DateClass} from "../../models/jsonparser/DateClass";

@Model()
export class ExampleEmbedded {

    constructor(@Field("id") public id: number,
        @Field("date") public date: DateClass,
        @Field("optionalName", true) public name?: string) {}
}

