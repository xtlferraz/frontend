import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceCity } from '../../service/city/api.serviceCity';
import { ApiServiceState } from 'src/app/service/state/api.serviceState';
import { State } from 'src/app/model/state/state.model';
import { of } from 'rxjs';


@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.css']
})
export class AddCityComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apiService: ApiServiceCity,
    private apiServiceState: ApiServiceState) { }

  addForm: FormGroup;
  stateId: State[];

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      id: [],
      name: ['', Validators.required],
      populationQuantity: ['', Validators.required],
      stateId: [],
    });

    of(this.apiServiceState.geStates()
      .subscribe(data => {
        this.stateId = data.result;
      }));
  }



  onSubmit() {
    this.apiService.createCity(this.addForm.value)
      .subscribe(data => {
        this.router.navigate(['city']);
      });
  }

}

