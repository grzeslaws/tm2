import {Component, OnInit} from "@angular/core";
import {GithubService} from "../../services/example/GithubService";

@Component({
  selector: "app-github",
  template: `<ol>
    <li *ngFor="let user of data.items">{{user.id}}</li>
  {{data.items.id}}</ol>`,
  providers: [GithubService]
})

export class GithubComponent implements OnInit {

  public searchResult;

  constructor(private githubService: GithubService) { }

  getUsers(){
    this.githubService.getUser().subscribe(
      res => {
        this.searchResult = res;
      }
    );
  }

  ngOnInit() {
    this.getUsers();
  }

}
