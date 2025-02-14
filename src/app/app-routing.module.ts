import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './_helper/not-found/not-found.component';

const routes: Routes = [
  { path: '', title: 'ChatterBox - Social Website', pathMatch: 'full', component: HomeComponent },
  { path: 'auth/login', title: 'Login | ChatterBox', component: LoginComponent },
  { path: 'auth/register', title: 'Register | ChatterBox', component: RegisterComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
