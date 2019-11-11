import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PagesComponent} from './pages/pages.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';


const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
