import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './component/welcome/welcome.component';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { ContactComponent } from './component/contact/contact.component';
import { SettingComponent } from './component/settings/setting.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';

const appRoutes: Routes = [
    {path: 'customer', component: CustomerListComponent},
    {path: 'contact', component: ContactComponent},
    {path: 'setting', component: SettingComponent},
    { path: 'welcome', component: WelcomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '', redirectTo: 'welcome', pathMatch: 'full' },
    { path: '**', redirectTo: 'welcome', pathMatch: 'full' },

];

export const AppRoutingModule = RouterModule.forRoot(appRoutes);