// import { Company } from './testA';
import {Model} from "../../services/jsonparser/decorators/Model";
import {Field} from "../../services/jsonparser/decorators/Field";
import {ArrayField} from "../../services/jsonparser/decorators/ArrayField";
import {ExampleEmbedded} from "./testF";


@Model()
export class Geo {

    constructor(
        @Field("lat") public lat: string,
        @Field("lng") public lng: string
        )
    {}
}

@Model()
export class Address {

    constructor(
        @Field("street") public street: string,
        @Field("suite") public suite: string,
        @Field("city") public city: string,
        @Field("zipcode") public zipcode: string,
            @Field("geo") public address: Geo
        )
    {}
}

@Model()
export class Company {

    constructor(
        @Field("name") public name: string,
        @Field("catchPhrase") public catchPhrase: string,
        @Field("bs") public bs: string
        )
    {}
}

@Model()
export class User {

    constructor(
        @Field("id") public id: number,
        @Field("name") public name: string,
        @Field("email") public email: string,
            @Field("address") public address: Address,
        @Field("phone") public phone: string,  
        @Field("website") public website: string,   
            @Field("company") public company: Company
        ) 
    {}
}









   // @ArrayField("mandatoryEmbedded", ExampleEmbedded) public mandatory: ExampleEmbedded[],
            // @ArrayField("optionalEmbedded", ExampleEmbedded, true) public optional: ExampleEmbedded[] = []