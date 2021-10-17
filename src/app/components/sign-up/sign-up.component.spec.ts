import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { SignUpComponent } from './sign-up.component';
import { UniqueUserValidator } from 'src/app/services/unique-user.directive';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { MaterialModule } from 'src/app/material.module';
import { By } from '@angular/platform-browser';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let nameInput: HTMLInputElement;
  let emailInput: HTMLInputElement;
  let passwordInput: HTMLInputElement;
  let repeatPasswordInput: HTMLInputElement;

  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  let navigateSpy: jasmine.Spy;
  navigateSpy = routerSpy.navigate;
  const authServiceSpy = jasmine.createSpyObj(
    'AuthService',
    ['loginWithJwt', 'registerUser'],
    { currentUser: null }
  );
  let registerUser: jasmine.Spy;
  let loginWithJwt: jasmine.Spy;
  registerUser = authServiceSpy.registerUser;
  loginWithJwt = authServiceSpy.loginWithJwt;

  const uniqueUserValidator = jasmine.createSpyObj('UniqueUserValidator', [
    'validate',
  ]);
  let validateUser: jasmine.Spy;
  validateUser = uniqueUserValidator.validate;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MaterialModule],

      declarations: [SignUpComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: UniqueUserValidator, useValue: uniqueUserValidator },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    nameInput = fixture.nativeElement.querySelector('input[name="fullName"]');
    emailInput = fixture.nativeElement.querySelector('input[name="email"]');

    passwordInput = fixture.nativeElement.querySelector(
      'input[name="password"]'
    );

    repeatPasswordInput = fixture.nativeElement.querySelector(
      'input[name="repeatPassword"]'
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('has required validator', () => {
    nameInput.value = '';
    nameInput.dispatchEvent(new Event('input'));
    nameInput.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    expect(component.fullName?.hasError('required')).toBeTruthy();
  });

  it('has min length validator', () => {
    nameInput.value = 'a';
    nameInput.dispatchEvent(new Event('input'));
    nameInput.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    expect(component.fullName?.hasError('minlength')).toBeTruthy();
  });

  it('has max length validator', () => {
    nameInput.value = 'a'.padStart(200, 'foo');
    nameInput.dispatchEvent(new Event('input'));
    nameInput.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    expect(component.fullName?.hasError('maxlength')).toBeTruthy();
  });

  it('has unique password validator', () => {
    nameInput.value = 'abcdef';
    emailInput.value = 'abcd@gmai.com';
    passwordInput.value = '123456';
    repeatPasswordInput.value = '1234567';
    validateUser.and.returnValue(of(null));
    nameInput.dispatchEvent(new Event('input'));
    nameInput.dispatchEvent(new Event('blur'));
    emailInput.dispatchEvent(new Event('input'));
    emailInput.dispatchEvent(new Event('blur'));
    passwordInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('blur'));
    repeatPasswordInput.dispatchEvent(new Event('input'));
    repeatPasswordInput.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    expect(component.myForm.hasError('identifyPassword')).toBeTruthy();
  });

  it('toggles the password display', () => {
    const passwordEl = fixture.debugElement.query(By.css('[name="password"]'));
    expect(passwordEl.attributes.type).toBe('password');

    const toggleButton = fixture.nativeElement.querySelector(
      '[name="togglePassword"]'
    ) as HTMLButtonElement;
    toggleButton.click();
    fixture.detectChanges();
    expect(passwordEl.attributes.type).toBe('text');
  });

  it('signup  successfully  for form', () => {
    nameInput.value = 'abcdef';
    emailInput.value = 'abcd@gmai.com';
    passwordInput.value = '123456';
    repeatPasswordInput.value = '123456';
    validateUser.and.returnValue(of(null));
    registerUser.and.returnValue(
      of({
        data: { name: 'Mike', email: 'Maike@gmai.com' },
        message: 'Successfully registered',
      })
    );

    nameInput.dispatchEvent(new Event('input'));
    nameInput.dispatchEvent(new Event('blur'));
    emailInput.dispatchEvent(new Event('input'));
    emailInput.dispatchEvent(new Event('blur'));
    passwordInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('blur'));
    repeatPasswordInput.dispatchEvent(new Event('input'));
    repeatPasswordInput.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    component.signup();
    const navArgs = navigateSpy.calls.first().args[0];
    expect(navArgs).toEqual(['/']);
    expect(navigateSpy).toHaveBeenCalled();
    expect(component.myForm.errors).toBeNull();
  });
});
