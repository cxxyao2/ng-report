import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportThisMonthComponent } from './report-this-month.component';

describe('ReportThisMonthComponent', () => {
  let component: ReportThisMonthComponent;
  let fixture: ComponentFixture<ReportThisMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportThisMonthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportThisMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
