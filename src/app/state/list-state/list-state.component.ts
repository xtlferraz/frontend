import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { State } from '../../model/state/state.model';
import { ApiServiceState } from '../../service/state/api.serviceState';

@Component({
  selector: 'app-list-state',
  templateUrl: './list-state.component.html',
  styleUrls: ['./list-state.component.css']
})
export class ListStateComponent implements OnInit {

  states: State[];
  config: any;

  constructor(private router: Router, private apiService: ApiServiceState) {
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: 0
    };
  }

  ngOnInit() {

    this.apiService.geStates()
      .subscribe(data => {
        this.config.totalItems = data.result.length;
        this.states = data.result;
      });
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }

  deleteState(state: State): void {
    this.apiService.deleteState(state.id)
      .subscribe(data => {
        this.states = this.states.filter(s => s !== state);
      });
  }

  editState(state: State): void {
    window.localStorage.removeItem('editStateId');
    window.localStorage.setItem('editStateId', state.id.toString());
    this.router.navigate(['edit-state']);
  }

  addState(): void {
    this.router.navigate(['add-state']);
  }
}
