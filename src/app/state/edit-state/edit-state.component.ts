import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { State } from '../../model/state/state.model';
import { ApiServiceState } from '../../service/state/api.serviceState';

@Component({
  selector: 'app-edit-state',
  templateUrl: './edit-state.component.html',
  styleUrls: ['./edit-state.component.css']
})
export class EditStateComponent implements OnInit {

  state: State;
  editForm: FormGroup;
  preview: string;

  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiServiceState) { }

  ngOnInit() {
    const stateId = window.localStorage.getItem('editStateId');
    if (!stateId) {
      alert('Invalid action.');
      this.router.navigate(['list-state']);
      return;
    }
    this.editForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      flag: ['', Validators.required],
      population: [''],
      populationCoast: ['']
    });
    this.apiService.getStateById(+stateId)
      .subscribe(data => {
        const state = Object.assign({}, data.result);
        state.populationCoast = state.population_cost;
        delete state.population_cost;
        this.editForm.setValue(state);
        this.preview = `http://localhost:3000/state/image/${state.flag}`;
      });
  }

  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.editForm.patchValue({
      flag: file
    });
    this.editForm.get('flag').updateValueAndValidity();

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result as string;
    };

    reader.readAsDataURL(file);
  }

  onSubmit() {
    this.apiService.updateState(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          if (data.status === 200) {
            alert('State updated successfully.');
            this.router.navigate(['list-user']);
          } else {
            alert(data.message);
          }
        },
        error => {
          alert(error);
        });
  }

}
