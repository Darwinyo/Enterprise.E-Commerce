import { RegistrationPage } from './../pages/registration/registration.page';
import { LoginPage } from './../pages/login/login.page';
import { Routes } from '@angular/router';

export const authRoutes: Routes = [
    { path: 'register', component: RegistrationPage, pathMatch: 'full' },
    { path: 'login', component: LoginPage, pathMatch: 'full' },
]
