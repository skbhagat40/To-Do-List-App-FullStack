import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PagesComponent} from './pages.component';
import {HomeViewComponent} from './home-view/home-view.component';


const routes: Routes = [
  {
    path: 'pages',
    component: PagesComponent,
  },
  {
    path: 'broad-topics/:id',
    component: HomeViewComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
