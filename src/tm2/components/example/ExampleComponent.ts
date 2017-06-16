import {Component, OnInit} from "@angular/core";
import {ExampleService, AvailableJSON} from "../../services/example/ExampleService";
import {I18NService} from "../../services/i18n/I18NService";
import {messages} from "../../i18n/messages";
import {Example} from "../../models/example/Example";

@Component({
  selector: "example",
  templateUrl: "./example.html",
  providers: [ExampleService]
})

export class ExampleComponent {
  i18n;
  example: Example;
  exampleOnInit;

  constructor(i18NService: I18NService, private exampleService: ExampleService) {
    this.i18n = i18NService.extractCurrentTranslation(messages);
  }

  fetchExample(availableJSON: AvailableJSON) {
    this.exampleService.getExample(availableJSON).subscribe(
      res => {
        this.example = res
      }
    );
  }

  fetchExampleOnInit(): void {
    this.exampleOnInit = this.exampleService.getExampleOnInit();
  }

  ngOnInit(): void {
    this.fetchExampleOnInit();
  }


}
