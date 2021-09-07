import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailToUsComponent } from './email-to-us.component';

describe('EmailToUsComponent', () => {
  let component: EmailToUsComponent;
  let fixture: ComponentFixture<EmailToUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailToUsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailToUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
