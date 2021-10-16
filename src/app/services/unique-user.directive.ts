import { Directive, forwardRef, Injectable } from '@angular/core';
import {
  AsyncValidator,
  AbstractControl,
  NG_ASYNC_VALIDATORS,
  ValidationErrors,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class UniqueUserValidator implements AsyncValidator {
  constructor(private userService: AuthService) {}

  validate(ctrl: AbstractControl): Observable<ValidationErrors | null> {
    return this.userService.findUserByEmail(ctrl.value).pipe(
      map((users) => {
        return users.length >= 1 ? { userExists: true } : null;
      }),
      catchError(() => of(null))
    );
  }
}

@Directive({
  selector: '[appUniqueUser]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => UniqueUserValidator),
      multi: true,
    },
  ],
})
export class UniqueUserDirective implements AsyncValidator {
  constructor(private validator: UniqueUserValidator) {}
  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.validator.validate(control);
  }
}
