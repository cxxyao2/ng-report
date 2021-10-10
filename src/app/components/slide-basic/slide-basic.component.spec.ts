import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideBasicComponent } from './slide-basic.component';

describe('SlideBasicComponent', () => {
  let component: SlideBasicComponent;
  let fixture: ComponentFixture<SlideBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlideBasicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
