import { Component, Renderer } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-header',
  template: `
    <img style="float: left;position: relative;left: 50px;" height="50px" width="50px" [src]="fullImagePath1">
    <img style="float: right; position: relative;right: 50px;" height="50px" width="50px" [src]="fullImagePath2">
    <h1 class="text-center">{{title}}</h1>
    <br>
  `,
  styles: [`
  h1 {
    color: green;
  }
`]
})

export class HeaderComponent {

  fullImagePath2: string;
  fullImagePath1: string;

  constructor() {
    this.fullImagePath1 = './assets/images/complete.png';
    this.fullImagePath2 = './assets/images/complete.png';
  }
  title: string = "EMPLOYEES MANAGEMENT SYSTEM";
}