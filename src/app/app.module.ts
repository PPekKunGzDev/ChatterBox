import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './_components/layouts/footer/footer.component';
import { AlertComponent } from './_components/assets/alert/alert.component';
import { HeaderComponent } from './_components/layouts/header/header.component';
import { RouterLink } from '@angular/router';
import { NotFoundComponent } from './_helper/not-found/not-found.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AlertComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterLink,
    FormsModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
