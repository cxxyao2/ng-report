import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniquePassComponent } from './unique-pass.component';

describe('UniquePassComponent', () => {
  let component: UniquePassComponent;
  let fixture: ComponentFixture<UniquePassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UniquePassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UniquePassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
