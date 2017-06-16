import { Component } from '@angular/core';

@Component ({
    selector: "vartical-menu",
    template: `
    <button class="btn" routerLinkActive="active" [routerLink]="['lists-trips']">Lista tripów</button>
    <button class="btn" routerLinkActive="active" [routerLink]="['user-score']">Ocena</button>
    <button class="btn" routerLinkActive="active" [routerLink]="['trends']">Trendy</button>
    <button class="btn" routerLinkActive="active" [routerLink]="['auto-rating']">Ocena</button>
    <button class="btn" routerLinkActive="active" [routerLink]="['profile']">Profil</button>
    `
})

export class VerticalMenuComponent {
  
}