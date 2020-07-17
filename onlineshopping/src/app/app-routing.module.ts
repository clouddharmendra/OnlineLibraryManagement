import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { AdvancedSearchComponent } from './components/advanced-search/advanced-search.component';

const routes: Routes = [
  {path: '', component: WelcomePageComponent},
  {path: 'home', component: HomeComponent},
  {path: 'account', component: MyAccountComponent},
  {path: 'login', component: UserLoginComponent},
  {path: 'book', component: BookDetailsComponent},
  {path: 'advsearch', component: AdvancedSearchComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
