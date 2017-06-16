import { HttpInterceptorConfig } from './http/HttpInterceptorConfig';
import { HttpInterceptor } from './http/HttpInterceptor';
import { AuthPreprocessor } from './http/preprocessor/AuthPreprocessor';
import { AuthService } from './services/auth/AuthService';
import { ListsTripsService } from './services/liststrips/ListsTripsService';
import { ListsTripsComponent } from './components/liststrips/ListsTripsComponent';
import {BrowserModule} from "@angular/platform-browser";
import {NgModule, ErrorHandler} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {Http, XHRBackend, HttpModule, ConnectionBackend, RequestOptions} from "@angular/http";
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'; 

import {Tm2ExceptionHandler, IssueAgent} from "./utilities/Tm2ExceptionHandler";
import {LoggingIssueAgent} from "./services/logging/LoggingIssueAgent";
import {Logger} from "./services/logging/Logger";
import {ConsoleAppender} from "./services/logging/ConsoleAppender";
import {JsonParser} from "./services/jsonparser/JsonParser";
import {CookieService} from "./services/cookie/CookieService";
import {I18NService} from "./services/i18n/I18NService";
import {ExampleService} from "./services/example/ExampleService";
import {UserService} from "./services/user/UserService";
import { PagerService } from './services/pagerservice/PagerService';

import {ExampleComponent} from "./components/example/ExampleComponent";
import {GithubComponent} from "./components/example/GithubComponent";
import {Tm2Component} from "./components/Tm2Component";
import {UserComponent} from "./components/user/UserComponent";
import { MainMenuComponent } from './components/menus/MainMenuComponent';
import { VerticalMenuComponent } from './components/menus/VerticalMenuComponent';
import { UserListComponent } from './components/userlist/UserListComponent';
import { StatisticsComponent } from './components/statistics/StatisticsComponent';
import { UserScoreComponent } from './components/userscore/UserScoreComponent';
import { AddAdministratorComponent } from './components/addadministrator/AddAdministratorComponent';
import { LoginComponent } from './components/login/LoginComponent';

export const connectionBackendProvider = { provide: ConnectionBackend, useClass: XHRBackend };
export function httpInterceptorFactory(backend, options, config){
  return new HttpInterceptor(backend, options, config);
}
export const httpProvider = { provide: Http, useFactory: httpInterceptorFactory, deps: [ConnectionBackend, RequestOptions, HttpInterceptorConfig] };


const appRoutes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'user-list', component: UserListComponent},
  { path: 'user/:id', component: UserComponent,
    children: [
      { path: '', redirectTo: 'lists-trips', pathMatch: 'full' },
      { path: 'lists-trips', component: ListsTripsComponent },
      { path: 'user-score', component: UserScoreComponent }
    ]
 },
  { path: 'statistisc', component: StatisticsComponent },
  { path: 'add-admin', component: AddAdministratorComponent }
];

const issueAgentProviders = [
    {provide: IssueAgent, multi: true, useClass: LoggingIssueAgent}
];
const errorHandlerProvider = {provide: ErrorHandler,  useClass: Tm2ExceptionHandler};

@NgModule({
  declarations: [
    ExampleComponent, Tm2Component, GithubComponent, UserComponent, MainMenuComponent, UserListComponent, StatisticsComponent, ListsTripsComponent, VerticalMenuComponent, UserScoreComponent, AddAdministratorComponent, LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [Logger, ConsoleAppender, issueAgentProviders[0], errorHandlerProvider, JsonParser, CookieService, 
    I18NService, ExampleService, UserService, PagerService, AuthPreprocessor, AuthService, HttpInterceptor, connectionBackendProvider, HttpInterceptorConfig, httpProvider ],
  bootstrap: [Tm2Component]
})
export class Tm2Module { }
