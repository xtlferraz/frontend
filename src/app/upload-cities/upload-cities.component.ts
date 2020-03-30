import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { State } from '../model/state/state.model';
import { of } from 'rxjs';
import { ApiServiceState } from '../service/state/api.serviceState';
import { ApiServiceCity } from '../service/city/api.serviceCity';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-cities',
  templateUrl: './upload-cities.component.html',
  styleUrls: ['./upload-cities.component.css']
})
export class UploadCitiesComponent implements OnInit {
  [x: string]: any;


  public records: any[] = [];
  @ViewChild('csvReader') csvReader: any;
  @ViewChild('txtFileUpload', { static: false }) txtFileUpload: ElementRef; files = [];
  cityTable: FormGroup;
  control: FormArray;
  mode: boolean;
  touchedRows: any;
  state_id: State[];

  constructor(
    private fb: FormBuilder,
    private apiServiceState: ApiServiceState,
    private router: Router,
    private apiService: ApiServiceCity) { }

  ngOnInit(): void {
    this.touchedRows = [];
    this.cityTable = this.fb.group({
      tableRows: this.fb.array([])
    });

    of(this.apiServiceState.geStates()
      .subscribe(data => {
        this.state_id = data.result;
      }));
  }

  ngAfterOnInit() {
    this.control = this.cityTable.get('tableRows') as FormArray;
  }

  initiateForm(name?: string, population?: string, state_id?: number): FormGroup {

    const form = this.fb.group({
      name: ['', Validators.required],
      population: ['', [Validators.required]],
      state_id: [[], [Validators.required]],
      isEditable: [true]
    });

    form.patchValue({
      name,
      population,
      state_id
    });

    return form;
  }



  deleteRow(index: number) {
    const control = this.cityTable.get('tableRows') as FormArray;
    control.removeAt(index);
  }

  editRow(group: FormGroup) {
    group.get('isEditable').setValue(true);
  }

  doneRow(group: FormGroup) {
    group.get('isEditable').setValue(false);
  }

  saveUserDetails() {
    console.log(this.cityTable.value);
  }

  get getFormControls() {
    const control = this.cityTable.get('tableRows') as FormArray;
    return control;
  }

  submitForm() {
    const control = this.cityTable.get('tableRows') as FormArray;

    control.controls.filter(row => {
      const { name, population, state_id } = row.value;

      this.apiService.createCity({ id: null, name, populationQuantity: population, stateId: state_id })
        .subscribe();
    });

    this.router.navigate(['city']);
  }

  toggleTheme() {
    this.mode = !this.mode;
  }

  uploadListener($event: any): void {

    const text = [];
    const files = $event.srcElement.files;

    if (this.isValidCSVFile(files[0])) {

      const input = $event.target;
      const reader = new FileReader();
      reader.readAsText(input.files[0]);

      reader.onload = () => {
        const csvData = reader.result;
        const csvRecordsArray = (csvData as string).split(/\r\n|\n/);

        const headersRow = this.getHeaderArray(csvRecordsArray);

        this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
      };

      reader.onerror = () => {
        console.log('Erro ao ler arquivo !');
      };

    } else {
      alert('Arquivo CSV inválido.');
      this.fileReset();
    }
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
    const csvArr = [];

    const control = this.cityTable.get('tableRows') as FormArray;
    for (let i = 1; i < csvRecordsArray.length; i++) {
      const curruntRecord = (csvRecordsArray[i] as string).split(',');
      if (curruntRecord.length === headerLength) {
        control.push(this.initiateForm(curruntRecord[0].trim(), curruntRecord[1].trim(), 1));
      }
    }
    return csvArr;
  }

  isValidCSVFile(file: any) {
    return file.name.endsWith('.csv');
  }

  getHeaderArray(csvRecordsArr: any) {
    const headers = (csvRecordsArr[0] as string).split(',');
    const headerArray = [];
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }

  fileReset() {
    this.csvReader.nativeElement.value = '';
    this.records = [];
  }


}
