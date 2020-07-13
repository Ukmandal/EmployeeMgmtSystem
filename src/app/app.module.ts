import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { CustomerModule } from "./customer/customer.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app.routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule, MatTabsModule } from "@angular/material";

import { AppComponent } from "./app.component";
import { WelcomeComponent } from "./component/welcome/welcome.component";
import { NavbarComponent } from "./component/navbar/navbar.component";
import { LoginComponent } from "./component/login/login.component";
import { RegisterComponent } from "./component/register/register.component";
import { HeaderComponent } from "./component/header-footer/header/header.component";
import { FooterComponent } from "./component/header-footer/footer/footer.component";

import { BsDropdownModule } from 'ngx-bootstrap';
import { ContactComponent } from "./component/contact/contact.component";
import { SettingComponent } from "./component/settings/setting.component";
import { AdminService } from "./customer/shared/stepper.service";
import { AuthService } from "./customer/shared/auth.service";

@NgModule({
  imports: [
    BrowserModule,
    CustomerModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatTabsModule,
    BsDropdownModule.forRoot(),
  ],

  declarations: [
    AppComponent,
    WelcomeComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    ContactComponent,
    SettingComponent,
  ],

  providers: [AdminService, AuthService],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    // NO_ERRORS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
