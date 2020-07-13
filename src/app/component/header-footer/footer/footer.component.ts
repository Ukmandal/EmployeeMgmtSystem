import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-footer',
  templateUrl: 'footer.component.html',
  styles: [`
    .panel-footer {
      background-color: green !important;
    }
  `]
})
export class FooterComponent {
  today: number = Date.now();
}
