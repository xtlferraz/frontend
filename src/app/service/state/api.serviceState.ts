import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { State } from '../../model/state/state.model';
import { ApiResponse } from '../../model/api.response';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiServiceState {

  constructor(private http: HttpClient) { }
  baseUrl = 'https://citystate.herokuapp.com/state/';

  geStates(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}all`);
  }

  getStateById(id: number): Observable<ApiResponse> {
    console.log(`${this.baseUrl}getById/${id}`);
    return this.http.get<ApiResponse>(`${this.baseUrl}getById/${id}`);
  }

  createState(state: State): Observable<ApiResponse> {
    const formData: any = new FormData();
    formData.append('name', state.name);
    formData.append('flag', state.flag);
    return this.http.post<ApiResponse>(this.baseUrl, formData);
  }

  updateState(state: State): Observable<ApiResponse> {
    const formData: any = new FormData();
    formData.append('id', state.id);
    formData.append('name', state.name);
    formData.append('flag', state.flag);
    return this.http.put<ApiResponse>(this.baseUrl, formData);
  }

  deleteState(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(this.baseUrl + id);
  }
}
