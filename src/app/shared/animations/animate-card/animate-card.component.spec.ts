import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimateCardComponent } from './animate-card.component';

describe('AnimateCardComponent', () => {
  let component: AnimateCardComponent;
  let fixture: ComponentFixture<AnimateCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimateCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimateCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
