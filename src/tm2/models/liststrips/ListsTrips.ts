import {Model} from "../../services/jsonparser/decorators/Model";
import {Field} from "../../services/jsonparser/decorators/Field";
import {ArrayField} from "../../services/jsonparser/decorators/ArrayField";
import {ListsTripsFields} from "./ListsTripsFields";

@Model()
export class ListsTrips {

    constructor(@Field("id") public id: number,
        @ArrayField("mandatoryEmbedded", ListsTripsFields) public mandatory: ListsTripsFields[]
        // @ArrayField("optionalEmbedded", ListsTripsFields, true) public optional: ListsTripsFields[] = []) {}
    ) {}
}

