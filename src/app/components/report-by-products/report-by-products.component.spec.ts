import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportByProductsComponent } from './report-by-products.component';

describe('ReportByProductsComponent', () => {
  let component: ReportByProductsComponent;
  let fixture: ComponentFixture<ReportByProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportByProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportByProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
