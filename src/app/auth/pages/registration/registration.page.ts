import { PasswordRegex, PhoneRegex, UserLoginRegex, DebounceTime } from './../../../shared/consts/config.const';
import { ReplaySubject } from 'rxjs/Rx';
import { getRegistrationPageUserLoginValidationError } from './../../reducers/registration-page.reducer';
import { BackEndValidatorDirective, backEndValidator } from './../../directives/validators/backend-validator.directive';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { NgForm, AbstractControl, ValidatorFn } from '@angular/forms';
import { PostApiHelper } from './../../../shared/helpers/post-api.helper';
import { UserService } from './../../services/user/user.service';
import { UserLoginModel } from './../../models/user/user-login/user-login.model';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { UserRegistrationResponseModel } from './../../models/responses/user-registration-response/user-registration-response.model';
import * as fromAuth from './../../reducers/auth-state.reducer';
import * as AuthActions from './../../actions/auth.actions';
import * as RegistrationPageActions from './../../actions/registration-page.actions';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-auth-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss']
})
// tslint:disable-next-line:component-class-suffix
export class RegistrationPage implements OnInit, AfterViewInit, OnDestroy {
  //#region properties
  //#region input event observables
  checkEmailObservable$: Observable<any>;
  checkPhoneObservable$: Observable<any>;
  checkUserLoginObservable$: Observable<any>;
  //#endregion

  //#region input fields selector
  @ViewChild('userloginTxtBox') userloginTxtBox: ElementRef;
  @ViewChild('phoneTxtBox') phoneTxtBox: ElementRef;
  @ViewChild('emailTxtBox') emailTxtBox: ElementRef;
  //#endregion

  //#region validation state
  userLoginValidationError$: Observable<Error>;
  emailValidationError$: Observable<Error>;
  phoneValidationError$: Observable<Error>;
  //#endregion
  pending$: Observable<boolean>;
  registrationForm: FormGroup;
  unsubscribe$: ReplaySubject<boolean>;
  //#endregion
  constructor(
    private authStore: Store<fromAuth.State>,
    private fb: FormBuilder
  ) {
    this.onCreateForm();
    //#region validation state
    this.userLoginValidationError$ = this.authStore.select(fromAuth.getRegistrationPageUserLoginValidationError);
    this.phoneValidationError$ = this.authStore.select(fromAuth.getRegistrationPagePhoneValidationError);
    this.emailValidationError$ = this.authStore.select(fromAuth.getRegistrationPageEmailValidationError);
    //#endregion
    this.unsubscribe$ = new ReplaySubject(1);
    this.pending$ = this.authStore.select(fromAuth.getRegistrationPagePending);
  }

  ngOnInit() {
    this.userLoginValidationError$
      .filter((err) => err !== null)
      .takeUntil(this.unsubscribe$)
      .subscribe((err) => {
        this.onBackEndValidatorError(this.userLogin, backEndValidator(err.toString()));
      });
    this.emailValidationError$
      .filter((err) => err !== null)
      .takeUntil(this.unsubscribe$)
      .subscribe((err) => {
        this.onBackEndValidatorError(this.email, backEndValidator(err.toString()));
      });
    this.phoneValidationError$
      .filter((err) => err !== null)
      .takeUntil(this.unsubscribe$)
      .subscribe((err) => {
        this.onBackEndValidatorError(this.phoneNumber, backEndValidator(err.toString()));
      });
  }
  ngAfterViewInit(): void {
    this.checkUserLoginObservable$ = Observable
      .fromEvent(this.userloginTxtBox.nativeElement, 'input');
    this.checkUserLoginObservable$
      .takeUntil(this.unsubscribe$)
      .map((event: any) => {
        this.onResetValidators(this.userLogin,
          [Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
          Validators.pattern(UserLoginRegex)]);
        return event.target.value;
      })
      .debounceTime(DebounceTime)
      .distinctUntilChanged()
      .subscribe((value) => {
        if (this.userLogin.valid) {
          this.checkUserLogin(value);
        }
      });
    this.checkPhoneObservable$ = Observable
      .fromEvent(this.phoneTxtBox.nativeElement, 'input');
    this.checkPhoneObservable$
      .takeUntil(this.unsubscribe$)
      .map((event: any) => {
        this.onResetValidators(this.phoneNumber,
          [Validators.required,
          Validators.minLength(8),
          Validators.maxLength(15),
          Validators.pattern(PhoneRegex)]);
        return event.target.value;
      })
      .debounceTime(DebounceTime)
      .distinctUntilChanged()
      .subscribe((value) => {
        if (this.phoneNumber.valid) {
          this.checkPhone(value);
        }
      });
    this.checkEmailObservable$ = Observable
      .fromEvent(this.emailTxtBox.nativeElement, 'input');
    this.checkEmailObservable$
      .takeUntil(this.unsubscribe$)
      .map((event: any) => {
        this.onResetValidators(this.email,
          [Validators.email,
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(30)]);
        return event.target.value;
      })
      .debounceTime(DebounceTime)
      .distinctUntilChanged()
      .subscribe((value) => {
        if (this.email.valid) {
          this.checkEmail(value);
        }
      });
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }
  onCreateForm() {
    this.registrationForm = this.fb.group({
      userLogin: ['',
        [Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.pattern(UserLoginRegex)]],
      phoneNumber: ['',
        [Validators.required,
        Validators.minLength(8),
        Validators.maxLength(15),
        Validators.pattern(PhoneRegex)]],
      email: ['',
        [Validators.email,
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(30)]],
      password: ['',
        [Validators.required,
        Validators.minLength(8),
        Validators.maxLength(15),
        Validators.pattern(PasswordRegex)]]
    });
  }

  //#region re-set validators
  onResetValidators(control: AbstractControl, validators: ValidatorFn[]) {
    if (control.getError('backend')) {
      control.setValidators(validators);
      control.updateValueAndValidity();
    }
  }
  onBackEndValidatorError(control: AbstractControl, validator: ValidatorFn) {
    control.setValidators(validator);
    control.updateValueAndValidity();
  }
  //#endregion

  //#region form fields
  get userLogin() {
    return this.registrationForm.get('userLogin');
  }
  get phoneNumber() {
    return this.registrationForm.get('phoneNumber');
  }
  get email() {
    return this.registrationForm.get('email');
  }
  get password() {
    return this.registrationForm.get('password');
  }
  //#endregion

  //#region validation methods
  getUserLogin_ErrorMessage() {
    return this.userLogin.getError('required') ?
      'User Login is required.' :
      this.userLogin.getError('minlength') ?
        'User Login length should be more than 6 characters.' :
        this.userLogin.getError('maxlength') ?
          'User Login length should not be more than 20 characters.' :
          this.userLogin.getError('pattern') ?
            'User Login must contain at least 1 number, 1 character. No Special Characters Allowed.' :
            this.userLogin.getError('backend') ? this.userLogin.errors['backend'].error : null;
  }
  getPhone_ErrorMessage() {
    return this.phoneNumber.getError('required') ?
      'Phone is required.' :
      this.phoneNumber.getError('minlength') ?
        'Phone length should be more than 8 characters.' :
        this.phoneNumber.getError('maxlength') ?
          'Phone length should not be more than 15 characters.' :
          this.phoneNumber.getError('pattern') ?
            'Phone Only Number Allowed' :
            this.phoneNumber.getError('backend') ? this.phoneNumber.errors['backend'].error : null;
  }
  getEmail_ErrorMessage() {
    return this.email.getError('required') ?
      'Email is required.' :
      this.email.getError('minlength') ?
        'Email length should be more than 10 characters.' :
        this.email.getError('maxlength') ?
          'Email length should not be more than 30 characters.' :
          this.email.getError('email') ?
            'Email pattern Error.' :
            this.email.getError('backend') ? this.email.errors['backend'].error : null;
  }
  getPassword_ErrorMessage() {
    return this.password.getError('required') ?
      'Password is required.' :
      this.password.getError('minlength') ?
        'Password length should be more than 8 characters.' :
        this.password.getError('pattern') ?
          'Password at least one uppercase letter, one lowercase letter, one number and one special character' :
          this.password.getError('maxlength') ?
            'Password length should not be more than 15 characters.' : null;
  }
  //#endregion

  //#region dispatch actions
  checkUserLogin(userLogin: string): void {
    this.authStore.dispatch(new RegistrationPageActions.ValidateUserLogin(userLogin));
  }
  checkPhone(phone: string): void {
    this.authStore.dispatch(new RegistrationPageActions.ValidatePhone(phone));
  }
  checkEmail(email: string): void {
    this.authStore.dispatch(new RegistrationPageActions.ValidateEmail(email));
  }
  //#endregion

  formValidator(): boolean {
    return this.registrationForm.invalid;
  }
  onRegistrationForm_Submit() {
    this.authStore.dispatch(new AuthActions.Registration(this.registrationForm.value));
  }
}
