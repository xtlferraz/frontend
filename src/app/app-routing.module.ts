import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { UploadCitiesComponent } from './upload-cities/upload-cities.component';

import { AddStateComponent } from './state/add-state/add-state.component';
import { ListStateComponent } from './state/list-state/list-state.component';
import { EditStateComponent } from './state/edit-state/edit-state.component';

import { AddCityComponent } from './city/add-city/add-city.component';
import { ListCityComponent } from './city/list-city/list-city.component';
import { EditCityComponent } from './city/edit-city/edit-city.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'upload-cities', component: UploadCitiesComponent },
  { path: 'add-state', component: AddStateComponent },
  { path: 'state', component: ListStateComponent },
  { path: 'edit-state', component: EditStateComponent },
  { path: 'add-city', component: AddCityComponent },
  { path: 'city', component: ListCityComponent },
  { path: 'edit-city', component: EditCityComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
