import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PagesModule} from './pages/pages.module';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule, HttpHandler} from '@angular/common/http';
import {AddSubtopicComponent} from './components/add-subtopic/add-subtopic.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthInterceptor} from './app.interceptor';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    AddSubtopicComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PagesModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [HttpClient,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }],
  bootstrap: [AppComponent],
})
export class AppModule {
}
