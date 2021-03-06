import * as _ from "lodash";
import {RefType} from "../RefType";
import {GenericTypes} from "../GenericTypes";

/*tslint:disable no-any*/
export function ArrayField(jsonProperty: string, type: RefType<any>, optional = false, genericTypes: GenericTypes = null) {
    return (target: Object, propertyKey: string | symbol, parameterIndex: number) => {
        (<any>Reflect).defineMetadata("field:" + parameterIndex, {propName: jsonProperty, type: type, optional: optional}, target);
        if (genericTypes) {
            _.keys(genericTypes.types).forEach(id => {
                (<any>Reflect).defineMetadata("generic:" + jsonProperty, genericTypes, target);
            });
        }
    };
}
/*tslint:enable no-any*/
