import { Directive } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';


/** Password should be equal to repeat-password */
export const uniquePasswordValidator: ValidatorFn = (
control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password');
  const repeatPassword = control.get('repeatPassword');

  return password && repeatPassword && password.value !== repeatPassword.value
    ? {
        identifyPassword: true,
      }
    : null;
};



@Directive({
  selector: '[appUniquePassword]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: UniquePasswordDirective,
      multi: true,
    },
  ],
})
export class UniquePasswordDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return uniquePasswordValidator(control);
  }
}

