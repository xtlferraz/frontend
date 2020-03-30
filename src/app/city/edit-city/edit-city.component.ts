import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { City } from '../../model/city/city.model';
import { ApiServiceCity } from '../../service/city/api.serviceCity';
import { Router } from '@angular/router';
import { State } from 'src/app/model/state/state.model';
import { ApiServiceState } from 'src/app/service/state/api.serviceState';
import { of } from 'rxjs';

@Component({
  selector: 'app-edit-city',
  templateUrl: './edit-city.component.html',
  styleUrls: ['./edit-city.component.css']
})
export class EditCityComponent implements OnInit {

  city: City;
  editForm: FormGroup;
  stateId: State[];
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apiService: ApiServiceCity,
    private apiServiceState: ApiServiceState) { }

  ngOnInit() {
    const cityId = window.localStorage.getItem('editCityId');
    if (!cityId) {
      alert('Invalid action.');
      this.router.navigate(['list-city']);
      return;
    }
    this.editForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      populationQuantity: ['', Validators.required],
      stateId: []
    });

    of(this.apiServiceState.geStates()
      .subscribe(data => {
        this.stateId = data.result;
      }));

    this.apiService.getCityById(+cityId)
      .subscribe(data => {
        const { id, name, population_quantity, state_id } = Object.assign({}, data.result);
        this.editForm.setValue({ id, name, populationQuantity: population_quantity, stateId: state_id });
      });
  }

  onSubmit() {
    this.apiService.updateCity(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          if (data.status === 200) {
            alert('Cidade atualizada com sucesso.');
            this.router.navigate(['list-city']);
          } else {
            alert(data.message);
          }
        },
        error => {
          alert(error);
        });
  }

}
