import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { City } from '../../model/city/city.model';
import { ApiServiceCity } from '../../service/city/api.serviceCity';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-list-city',
  templateUrl: './list-city.component.html',
  styleUrls: ['./list-city.component.css']
})

export class ListCityComponent implements OnInit {

  citys: City[];
  config: any;

  constructor(private router: Router, private apiService: ApiServiceCity) {
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: 0
    };
  }

  ngOnInit() {
    this.apiService.getCity()
      .subscribe(data => {
        this.config.totalItems = data.result.length;
        this.citys = data.result;
      });
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }

  deleteCity(city: City): void {
    this.apiService.deleteCity(city.id)
      .subscribe(data => {
        this.citys = this.citys.filter(s => s !== city);
      });
  }

  editCity(city: City): void {
    window.localStorage.removeItem('editCityId');
    window.localStorage.setItem('editCityId', city.id.toString());
    this.router.navigate(['edit-city']);
  }

  addCity(): void {
    this.router.navigate(['add-city']);
  }

}
