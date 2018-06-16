import { Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { HomeComponent } from '../home/home.component';
import { PrivateViewComponent } from '../private-view/private-view.component';

export const routes: Routes = [
    {path: 'home' , component: HomeComponent} ,
    {path: 'login' , component: LoginComponent} ,
    {path: 'privateView' , component: PrivateViewComponent} ,
    {path: '' , redirectTo: '/home' , pathMatch: 'full' }
];
