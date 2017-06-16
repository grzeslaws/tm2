import {TestBed, inject} from "@angular/core/testing";
import {} from 'jasmine';
import {ExampleService} from "../../../tm2/services/example/ExampleService";
import {JsonParser} from "../../../tm2/services/jsonparser/JsonParser";

describe("ExampleService", () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [JsonParser, ExampleService]
        });
    });

    it("should fetch valid1", inject([ExampleService], (service: ExampleService) => {
        const result = service.getExample("valid1");
        // expect(result.id).toBe(1);
    }));
    it("should fail while fetching missingTopLevelId", inject([ExampleService], (service: ExampleService) => {
        expect(() => service.getExample("missingTopLevelId")).toThrow();
    }));
});
