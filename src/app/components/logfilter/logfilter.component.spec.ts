import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogfilterComponent } from './logfilter.component';

describe('LogfilterComponent', () => {
  let component: LogfilterComponent;
  let fixture: ComponentFixture<LogfilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogfilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogfilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
