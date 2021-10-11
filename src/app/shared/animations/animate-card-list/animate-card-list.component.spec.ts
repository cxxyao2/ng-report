import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimateCardListComponent } from './animate-card-list.component';

describe('AnimateCardListComponent', () => {
  let component: AnimateCardListComponent;
  let fixture: ComponentFixture<AnimateCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimateCardListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimateCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
