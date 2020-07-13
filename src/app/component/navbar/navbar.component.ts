import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterComponent } from '../register/register.component';
import { MatDialog } from '@angular/material';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../../customer/shared/auth.service';

@Component({
  moduleId: module.id,
  selector: 'nav-bar',
  templateUrl: 'navbar.component.html',
  styles: [`
  .bg-light {
    background-color: green !important;
}
.navbar-light .navbar-nav .nav-link {
  color: greenyellow;
}
.navbar-light .navbar-brand {
  color: greenyellow;
}
  `]
})
export class NavbarComponent {

  isloginSuceeded: boolean = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog,
  ) { }

  ngAfterViewInit() {
    this.authService.onLoginSuccess.subscribe(x => {
      this.isloginSuceeded = x !== undefined;
    })
  }
}

