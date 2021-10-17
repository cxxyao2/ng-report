import { FormControl } from '@angular/forms';

import { User } from '../models/user';

import {
  UniqueUserDirective,
  UniqueUserValidator,
} from './unique-user.directive';
import { AuthService } from './auth.service';
import { of } from 'rxjs';

fdescribe('UniqueUserValidator', () => {
  let emailControl: FormControl;
  let uniqueValidator: UniqueUserValidator;

  it(' has "userExists" error from a fake object', () => {
    const emailValue = 'Mike@google.com';
    const myUser: Partial<User> = {
      email: emailValue,
    };

    const fake = { findUserByEmail: () => of([myUser]) };

    uniqueValidator = new UniqueUserValidator(fake as any as AuthService);

    emailControl = new FormControl();
    emailControl.setValue(emailValue);
    uniqueValidator.validate(emailControl).subscribe((data: any) => {
      expect(data.userExists).toBeTrue();
    });
  });
});

fdescribe('without TestBed', () => {
  it(' has "userExists" error from a fake object', () => {
    const emailValue = 'Mike@google.com';
    const fake = {
      validate: () =>
        of({
          userExists: true,
        }),
    };

    const uniqueUserDirective = new UniqueUserDirective(
      fake as any as UniqueUserValidator
    );

    const emailControl = new FormControl();
    emailControl.setValue(emailValue);
    uniqueUserDirective.validate(emailControl).subscribe((data: any) => {
      expect(data.userExists).toBeTrue();
    });
  });
});
