import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideShowsComponent } from './slide-shows.component';

describe('SlideShowsComponent', () => {
  let component: SlideShowsComponent;
  let fixture: ComponentFixture<SlideShowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlideShowsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideShowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
