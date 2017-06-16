import {Model} from "../../services/jsonparser/decorators/Model";
import {Field} from "../../services/jsonparser/decorators/Field";
import {ArrayField} from "../../services/jsonparser/decorators/ArrayField";
import {ExampleEmbedded} from "./ExampleEmbedded";

@Model()
export class Example {

    constructor(@Field("id") public id: number,
        @ArrayField("mandatoryEmbedded", ExampleEmbedded) public mandatory: ExampleEmbedded[],
        @ArrayField("optionalEmbedded", ExampleEmbedded, true) public optional: ExampleEmbedded[] = []) {}
}

