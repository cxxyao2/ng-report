import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportThisYearComponent } from './report-this-year.component';

describe('ReportThisYearComponent', () => {
  let component: ReportThisYearComponent;
  let fixture: ComponentFixture<ReportThisYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportThisYearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportThisYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
