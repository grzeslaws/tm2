import {Model} from "../../services/jsonparser/decorators/Model";
import {Field} from "../../services/jsonparser/decorators/Field";
import {ArrayField} from "../../services/jsonparser/decorators/ArrayField";
import {UserListFields} from "./UserListFields";

@Model()
export class UserList {

    constructor(@Field("id") public id: number,
        @ArrayField("mandatoryEmbedded", UserListFields) public mandatory: UserListFields[],
        @ArrayField("optionalEmbedded", UserListFields, true) public optional: UserListFields[] = []) {}
}

