export enum JsonParseErrorCode {
    MISSING_PROPERTY, //a mandatory property was not found in JSON object
    INVALID_TYPE, //the type of the property in JSON does not match the expected type
    MISSING_ANNOTATION, //a @Field or @Model annotation is missing
    INVALID_MODEL_CLASS //the supplied class is not a valid candidate for a model
}
export class JsonParseError {
    constructor(public message: string, public code: JsonParseErrorCode) {}

    public toString(): string {
        return "JsonParseError: " + this.message;
    }
}
