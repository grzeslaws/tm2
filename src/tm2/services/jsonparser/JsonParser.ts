import {Injectable} from "@angular/core";
import * as _ from "lodash";
import {RefType} from "./RefType";
import {GenericTypes} from "./GenericTypes";
import {JsonParseError, JsonParseErrorCode} from "./JsonParseError";

/*tslint:disable no-any , no-string-litera*/
@Injectable()
export class JsonParser {
    public tryReadField <T>(jsonValue: any, matchesType: (fieldVal: any) => boolean,
        convert: (field: any) => T, error: () => JsonParseError): any {
            if (matchesType(jsonValue)) {
                return convert(jsonValue);
            }
            throw error();
    }

    public parseValue(cls: RefType<any>, json: Object, spec: {propName: string, type?: RefType<any>, optional: boolean},
        prefix: string, genericTypes?: GenericTypes): any {
        function propName() {
            return prefix + "/" + spec.propName;
        }

        if (spec.optional && (json === undefined) || json === null) {
            return undefined;
        }
        const expectedTypeName = this.getName(cls);
        switch (expectedTypeName) {
            case "String":
                return this.tryReadField(json, fieldValue => typeof fieldValue === "string",
                    fieldValue => <string> fieldValue,
                    () => new JsonParseError("Expected a string value for property " + propName(), JsonParseErrorCode.INVALID_TYPE));
            case "Number":
                return this.tryReadField(json, fieldValue => typeof fieldValue === "number",
                    fieldValue => <number> fieldValue,
                    () => new JsonParseError("Expected a number value for property " + propName(), JsonParseErrorCode.INVALID_TYPE));
            case "Boolean":
                return this.tryReadField(json, fieldValue => typeof fieldValue === "boolean",
                    fieldValue => <boolean> fieldValue,
                    () => new JsonParseError("Expected a boolean value for property " + propName(), JsonParseErrorCode.INVALID_TYPE));
            case "DateClass":
                const regExp = /(\d{4})-(\d{2})(?:-(\d{2}))?.*/;
                return this.tryReadField(json, fieldValue => {
                        return regExp.test(fieldValue);
                    },
                    fieldValue => {
                        const [ , year, month, day] = regExp.exec(fieldValue);
                        if (!_.isUndefined(day)) {
                            return new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10));
                        } else {
                            return new Date(parseInt(year, 10), parseInt(month, 10) - 1);
                        }
                    },
                    () => new JsonParseError("Expected a Date object for property " + propName(), JsonParseErrorCode.INVALID_TYPE));
            case "Array":
                if (!spec.type) {
                    throw new JsonParseError("Missing type annotation for array property " + propName(), JsonParseErrorCode.INVALID_TYPE);
                }
                return this.tryReadField(json, fieldValue => _.isArray(fieldValue),
                    fieldValue => (<Array<any>>fieldValue).map((arrayElem, idx) => this.parseValue(spec.type, arrayElem, {propName: "[" + idx + "]", optional: false},
                        prefix + "/" + spec.propName, genericTypes)),
                    () => new JsonParseError("Expected an array for property " + propName(), JsonParseErrorCode.INVALID_TYPE));
            case "Map":
                //TODO: parsing Maps
                return new Map();
            default:
                return this.doParse(cls, json, prefix + "/" + spec.propName, genericTypes);
        }
    }
    public doParse(cls: RefType<any>, json: Object, prefix: string, genericTypes?: GenericTypes): any {
        let getMetadata = (<any>Reflect).getMetadata;
        let isModel = getMetadata("@Model", cls);
        if (!isModel) {
            if (this.isSimpleType(cls)) {
                return this.parseValue(cls, json, {propName: "array", type: cls, optional: true}, prefix);
            }
            throw new JsonParseError("Only @Model annotated classes or simple type objects can be deserialized."
                + " Cannot deserialize class " + this.getName(cls) + " at " + prefix, JsonParseErrorCode.MISSING_ANNOTATION);
        }
        let constructorParams = <Array<RefType<any>>> _.clone(getMetadata("design:paramtypes", cls));
        if (!constructorParams) {/*tslint:disable no-string-literal */
            throw new JsonParseError("Missing constructor for type " + cls["name"], JsonParseErrorCode.INVALID_MODEL_CLASS);
        }
        let jsonProps = _.times(constructorParams.length).map(n => <string> getMetadata("field:" + n, cls));
        if (genericTypes) {
            jsonProps.forEach((prop, n) => {
                let spec = <any> prop;
                if (genericTypes.types[spec.propName] && constructorParams[n] === Object) {
                    constructorParams[n] = genericTypes.types[spec.propName];
                }
            });
        }
        let generics = _.times(constructorParams.length).map(n => this.getGenericMetadata(jsonProps, n, cls, getMetadata));
        let values = _.zip<any>(jsonProps, constructorParams, generics).map(data => {
            let spec = <{propName: string, type?: RefType<any>, optional: boolean}> data[0];
            let param = <RefType<any>> data[1];
            let genericTypesData = data[2];
            if (!spec || !spec.propName) {
                throw new JsonParseError("Missing @Field annotation in type " + this.getName(cls), JsonParseErrorCode.MISSING_ANNOTATION);
            }
            if (!json.hasOwnProperty(spec.propName) && !spec.optional) {
                throw new JsonParseError("Missing property " + spec.propName + " at path " + prefix, JsonParseErrorCode.MISSING_PROPERTY);
            }
            let innerJson = json[spec.propName];
            return this.parseValue(param, innerJson, spec, prefix, genericTypesData);
        });
        return new cls(...values);
    }
    public getGenericMetadata(props, index, cls, getMetadata) {
        if (props && props[index] && props[index].propName) {
            return <string>getMetadata("generic:" + props[index].propName, cls);
        }
    }
    public getName<T>(cls: RefType<T>) {
        if (cls["type"]) {
            return cls["type"];
        }
        if (cls["name"]) {
            return cls["name"];
        }
        const funcNameRegex = /function (.{1,})\(/;
        const results = (funcNameRegex).exec(cls.toString());
        return (results && results.length > 1) ? results[1] : "";
    }
    public parse<T>(cls : RefType<T>, json: Object): T {
        return this.parseValue(cls, json, {propName: ".", optional: false}, "");
    }
    public parseArray<T>(cls: RefType<T>, json: Object, optional = false): T[] {
        if (json === null && optional) {
            return [];
        }
        return this.parseValue(Array, json, {propName: ".", optional: optional, type: cls}, "");
    }
    private isSimpleType(cls: RefType<any>) {
        let typeName = this.getName(cls);
        return typeName === "String" || typeName === "Number" || typeName === "Boolean" || typeName === "DateClass";
    }
}
/*tslint:enable no-any , no-string-literal*/
