import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { HomeViewComponent } from './home-view/home-view.component';
import {MatButtonModule, MatListModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {ToastrModule} from 'ngx-toastr';


@NgModule({
  declarations: [PagesComponent, HomeViewComponent],
  exports: [
    PagesComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MatListModule,
    MatButtonModule,
    FormsModule,
    ToastrModule.forRoot() // ToastrModule added
  ],
})
export class PagesModule { }
