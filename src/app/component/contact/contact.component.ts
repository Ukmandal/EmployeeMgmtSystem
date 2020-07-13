import { Component, ComponentFactoryResolver } from "@angular/core";
import { trigger, transition, animate, style, state } from "@angular/animations";

@Component({
    templateUrl: 'contact.component.html',
    styles: [`
    .div {
        text-align: left;
    }
    .a {
      cursor:pointer;
    }
    .img-radius {
      border-radius: 50%;
      border-style: solid;
      border-color: forestgreen;
      border-width: 5px;
  }
    `],
})
export class ContactComponent {
    fullImagePath1: string;
    fullImagePath2: string;
    fullImagePath3: string;
    fullImagePath4: string;

    constructor(
        private resolver: ComponentFactoryResolver,
    ) {
        this.fullImagePath1 = './assets/images/avatar-1.jpg';
        this.fullImagePath2 = './assets/images/avatar-8.jpg';
        this.fullImagePath3 = './assets/images/avatar-3.jpg';
        this.fullImagePath4 = './assets/images/avatar-2.jpg';
    }
}