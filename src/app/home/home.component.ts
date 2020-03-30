import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceCity } from 'src/app/service/city/api.serviceCity';
import { ApiServiceState } from 'src/app/service/state/api.serviceState';
import { of } from 'rxjs';
import { State } from '../model/state/state.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private apiServiceState: ApiServiceState) { }

  addForm: FormGroup;
  state: State[];
  states: State;

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      state: [],
    });

    of(this.apiServiceState.geStates()
      .subscribe(data => {
        this.state = data.result;
        const element = this.state.find((el) => {
          return el.name.toUpperCase() === 'SANTA CATARINA';
        });
        this.addForm.setValue({ state: element.id });
        this.changeState(element.id);

      }));


  }

  changeState(stateId) {
    this.apiServiceState.getStateById(+stateId)
      .subscribe(data => {
        const state = data.result;
        state.populationCoast = state.population_cost;
        delete state.population_cost;
        this.states = state;
      });
  }

}
