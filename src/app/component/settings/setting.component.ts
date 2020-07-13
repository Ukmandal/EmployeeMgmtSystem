import { Component } from "@angular/core";

@Component({
templateUrl: 'setting.component.html'
})
export class SettingComponent{
    fullImage: string;
 constructor(){
    this.fullImage = './assets/images/construction.jpg';
 }
}