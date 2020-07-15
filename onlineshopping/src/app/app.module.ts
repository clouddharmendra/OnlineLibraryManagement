import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { OnlineShoppingObserver } from './services/online-shopping-observer';
import { BookDetailsComponent } from './components/book-details/book-details.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    NotFoundComponent,
    // CartInfoComponent,
    WelcomePageComponent,
    MyAccountComponent,
    UserLoginComponent,
    BookDetailsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [OnlineShoppingObserver],
  bootstrap: [AppComponent]
})
export class AppModule { }
