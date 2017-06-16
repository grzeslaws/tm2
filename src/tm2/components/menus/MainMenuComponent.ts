import { Component } from '@angular/core';

@Component ({
    selector: "main-menu",
    template: `
    <button class="btn secondary" routerLink="/user-list" routerLinkActive="active">User list</button>
    <button class="btn secondary" routerLink="/statistisc" routerLinkActive="active">Statistics</button>
    <button class="btn secondary" routerLink="/add-admin" routerLinkActive="active">Dodaj administratora</button>`
})

export class MainMenuComponent {

}