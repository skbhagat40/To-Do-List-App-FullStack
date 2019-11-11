import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { HomeViewComponent } from './home-view/home-view.component';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
  MatIconModule,
  MatListModule,
} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {ToastrModule} from 'ngx-toastr';
import {AddSubtopicComponent} from '../components/add-subtopic/add-subtopic.component';
import {DragDropModule} from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [PagesComponent, HomeViewComponent],
  exports: [
    PagesComponent,
  ],
  imports: [
    MatDialogModule,
    CommonModule,
    PagesRoutingModule,
    MatListModule,
    MatButtonModule,
    FormsModule,
    ToastrModule.forRoot(),
    MatCheckboxModule,
    MatIconModule,
    DragDropModule,
    // ToastrModule added
  ],
  entryComponents: [AddSubtopicComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class PagesModule { }
