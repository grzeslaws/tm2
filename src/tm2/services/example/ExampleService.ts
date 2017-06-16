import { Observable } from 'rxjs/Rx';
import {Injectable} from "@angular/core";
import {JsonParser} from "../jsonparser/JsonParser";
import {Example} from "../../models/example/Example";

@Injectable()
export class ExampleService {

    constructor(private jsonParser: JsonParser) {}

    getExample(jsonType: AvailableJSON): Observable<Example> {
        return Observable.of(this.jsonParser.parse(Example, availableJSON[jsonType]));
    }

    getExampleOnInit() {
        return availableJSON;
    }
}

export type AvailableJSON = "valid1" | "valid2" | "missingTopLevelId" | "missingTopLevelMandatorEmbedded" |
    "missingIdOnFirstEmbedded" | "incorrectIdTypeForSecondEmbedded" | "unparsableDateOnFirstEmbedded";

const availableJSON = {
    valid1: {
        id: 1,
        mandatoryEmbedded: [
            {
                id: 1,
                date: "2017-06-15",
                optionalName: "this is optional but if specified will be parsed"
            },
            {
                id: 2,
                date: "2017-06-15",
                someOtherField: "This will be ignored"
            }
        ]
    },

    valid2: {
        id: 1,
        mandatoryEmbedded: [
            {
                id: 1,
                date: "2017-06-15",
                optionalName: "first object in mandatory list"
            },
            {
                id: 3,
                date: "2017-06-15",
                optionalName: "first object in mandatory list"
            }
        ],
        optionalEmbedded: [
            {
                id: 2,
                date: "2017-06-15",
                optionalName: "first object in optional list"
            }
        ]
    },

    missingTopLevelId: {
        id: 1,
        mandatoryEmbedded: [
          {
              id: 1,
              date: "2017-06-15",
              optionalName: "first object in mandatory list"
          }
        ]
    },

    missingTopLevelMandatorEmbedded: {
        id: 1,
        MaNdatoryEmbedded: [] //mistyped
    },

    missingIdOnFirstEmbedded: {
        id: 1,
        mandatoryEmbedded: [
            {
                date: "2017-06-15"
            },
            {
                id: 2,
                date: "2017-06-16"
            }
        ]
    },

    incorrectIdTypeForSecondEmbedded: {
        id: 1,
        mandatoryEmbedded: [
            {
                id: 1,
                date: "2017-06-15"
            },
            {
                id: "this is not a number",
                date: "2017-06-16"
            }
        ]
    },

    unparsableDateOnFirstEmbedded: {
        id: 1,
        mandatoryEmbedded: [
            {
                id: 1,
                date: "2017-06-15"
            },
            {
                id: 2,
                date: "this is not a date"
            }
        ]
    }
};
