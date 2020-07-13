import { Component } from '@angular/core';

@Component({
  templateUrl: 'welcome.component.html',
  styles: [`
  .panel-heading{
    text-align: center;
  }

  .panel-body{
    text-align: center;
  }
  `]
})
export class WelcomeComponent {
  public pageTitle: string = 'Employee management System --[EMS]';
}
