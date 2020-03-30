import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceState } from '../../service/state/api.serviceState';



@Component({
  selector: 'app-add-state',
  templateUrl: './add-state.component.html',
  styleUrls: ['./add-state.component.css']
})
export class AddStateComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiServiceState) { }

  addForm: FormGroup;
  preview: string;

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      id: [],
      name: ['', Validators.required],
      flag: ['', Validators.required]
    });

  }


  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.addForm.patchValue({
      flag: file
    });
    this.addForm.get('flag').updateValueAndValidity();

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result as string;
    };

    reader.readAsDataURL(file);
  }


  onSubmit() {
    this.apiService.createState(this.addForm.value)
      .subscribe(data => {
        this.router.navigate(['state']);
      });
  }


}
