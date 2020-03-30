import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadCitiesComponent } from './upload-cities.component';

describe('UploadCitiesComponent', () => {
  let component: UploadCitiesComponent;
  let fixture: ComponentFixture<UploadCitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadCitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadCitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
