import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { UploadCitiesComponent } from './upload-cities/upload-cities.component';
import { UserTableComponent } from './user-table/user-table.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DragableColumnDirective } from './dragable-column-directive/dragable-column.directive';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { ListStateComponent } from './state/list-state/list-state.component';
import { AddStateComponent } from './state/add-state/add-state.component';
import { EditStateComponent } from './state/edit-state/edit-state.component';
import { ListCityComponent } from './city/list-city/list-city.component';
import { AddCityComponent } from './city/add-city/add-city.component';
import { EditCityComponent } from './city/edit-city/edit-city.component';
import { ApiServiceCity } from './service/city/api.serviceCity';
import { ApiServiceState } from './service/state/api.serviceState';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpErrorInterceptor } from './http-error.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    UploadCitiesComponent,
    UserTableComponent,
    DragableColumnDirective,
    ListStateComponent,
    AddStateComponent,
    EditStateComponent,
    ListCityComponent,
    AddCityComponent,
    EditCityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [
    ApiServiceCity,
    ApiServiceState,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
