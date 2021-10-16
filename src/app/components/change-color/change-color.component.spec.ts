import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { ChangeColorComponent } from './change-color.component';

describe('ChangeColorComponent', () => {
  let component: ChangeColorComponent;
  let fixture: ComponentFixture<ChangeColorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChangeColorComponent],
      imports: [FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the favorite color in the component', fakeAsync(() => {
    const input = fixture.nativeElement.querySelector('input');
    const event = new Event('input');
    input.value = 'Red';
    input.dispatchEvent(event);
    fixture.detectChanges();
    expect(component.favoriteColor).toEqual('Red');
  }));

  it('should update the favorite color in the input field', fakeAsync(() => {
    component.favoriteColor = 'Blue';
    fixture.detectChanges();
    tick();
    const input = fixture.nativeElement.querySelector('input');
    expect(input.value).toBe('Blue');
  }));
});
