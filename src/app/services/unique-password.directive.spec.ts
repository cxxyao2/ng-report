import {
  UniquePasswordDirective,
  uniquePasswordValidator,
} from './unique-password.directive';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import {
  Component,
  EventEmitter,
  Output,
  OnInit,
  DebugNode,
  DebugElement,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  waitForAsync,
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';

/**
 *  Test an sync form validator and sync form directive
 */
// two-way binding in template-driven form
@Component({
  template: `
    <form #myForm="ngForm" appUniquePassword>
      <input
        type="text"
        id="password"
        name="password"
        required
        (change)="onChange()"
        [(ngModel)]="model.newPassword"
      />
      <input
        type="text"
        name="repeatPassword"
        id="repeatPassword"
        required
        [(ngModel)]="model.newRepeatPassword"
      />
      <div id="model">{{ model | json }}</div>
      <div id="formErrors">{{ myForm.errors | json }}</div>
    </form>
  `,
})
class TestComponent implements OnInit {
  @Output() changedPasswordEvent = new EventEmitter<string>();

  public model = {
    newPassword: '',
    newRepeatPassword: '',
  };

  ngOnInit() {}
  onChange(): void {
    this.changedPasswordEvent.emit(this.model.newPassword);
  }
}

fdescribe('uniquePasswordValidator', () => {
  const password = 'password';
  const repeatPassword = 'repeatPassword';
  let formGroup: FormGroup;

  beforeEach(() => {
    formGroup = new FormGroup(
      {
        [password]: new FormControl(),
        [repeatPassword]: new FormControl(),
      },
      { validators: uniquePasswordValidator, updateOn: 'submit' }
    );
  });

  it('should has "identifyPassword" error if password do not match  ', () => {
    formGroup.patchValue({ [password]: '123', [repeatPassword]: '321' });
    expect(formGroup.get(repeatPassword)?.value).toBe('321');
    expect(formGroup.get(password)?.value).toBe('123');
    expect(formGroup.hasError('identifyPassword')).toBe(true);
  });
});

fdescribe('UniquePasswordDirective', () => {
  let des: DebugNode[];
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let form: NgForm;
  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [UniquePasswordDirective, TestComponent],
      imports: [FormsModule],
    }).createComponent(TestComponent);

    // const formElement = fixture.debugElement.children[0];
    const formElement = fixture.debugElement.query(By.css('form'));
    form = formElement.injector.get(NgForm);
    fixture.detectChanges();
    component = fixture.componentInstance;

    des = fixture.debugElement.queryAllNodes(
      By.directive(UniquePasswordDirective)
    );
  });

  it('should create TestComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should show empty input field by default', () => {
    const passwordDe = fixture.debugElement.query(
      By.css('input[name=password]')
    );
    const passwordEl = passwordDe.nativeElement;
    const repeatPasswordDe = fixture.debugElement.query(
      By.css('input[name=repeatPassword]')
    );
    const repeatPasswordEl = repeatPasswordDe.nativeElement;

    expect(passwordEl.value).toEqual('');
    expect(repeatPasswordEl.value).toEqual('');
  });

  it('should emit a value on change', (done: DoneFn) => {
    const value = 'Pretty';
    const changeEvent = new Event('change');
    component.model.newPassword = value;
    fixture.detectChanges();

    const passwordInput = fixture.nativeElement.querySelector(
      'input[name="password"]'
    );

    component.changedPasswordEvent.subscribe((res) => {
      expect(res).toBe(value);
      done();
    });

    passwordInput.dispatchEvent(changeEvent);
  });

  it(
    'should show error when password is not equal to repeatPassword',
    waitForAsync(() => {
      component.model = {
        newPassword: 'aaa',
        newRepeatPassword: 'bbb',
      };
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(form.hasError('identifyPassword')).toBe(true);
      });
    })
  );

  it('should have one attribute directive uniquePassword', () => {
    expect(des.length).toBe(1);
  });
});
