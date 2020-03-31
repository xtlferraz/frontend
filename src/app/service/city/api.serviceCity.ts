import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { City } from '../../model/city/city.model';
import { ApiResponse } from '../../model/api.response';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})

@Injectable()
export class ApiServiceCity {

  constructor(private http: HttpClient) { }
  baseUrl = 'https://citystate.herokuapp.com/city/';

  getCity(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}all`);
  }

  getCityById(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}getById/${id}`);
  }

  createCity(city: City): Observable<ApiResponse> {
    const { name, populationQuantity, stateId } = city;

    const data = {
      name,
      population_quantity: populationQuantity,
      state_id: stateId
    };

    return this.http.post<ApiResponse>(this.baseUrl, data);
  }

  updateCity(city: City): Observable<ApiResponse> {
    const { id, name, populationQuantity, stateId } = city;

    const data = {
      id,
      name,
      population_quantity: populationQuantity,
      state_id: stateId
    };

    console.log(data);

    return this.http.put<ApiResponse>(this.baseUrl, data);
  }

  deleteCity(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(this.baseUrl + id);
  }
}
