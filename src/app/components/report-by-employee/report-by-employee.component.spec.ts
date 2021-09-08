import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportByEmployeeComponent } from './report-by-employee.component';

describe('ReportByEmployeeComponent', () => {
  let component: ReportByEmployeeComponent;
  let fixture: ComponentFixture<ReportByEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportByEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportByEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
