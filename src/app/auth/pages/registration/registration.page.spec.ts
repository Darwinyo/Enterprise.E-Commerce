import { cold, hot } from 'jasmine-marbles';
import { Observable, TestScheduler } from 'rxjs/Rx';
import { CovalentLoadingModule, CovalentDialogsModule } from '@covalent/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Store, StoreModule, combineReducers } from '@ngrx/store';
import { PostApiHelper } from './../../../shared/helpers/post-api.helper';
import { RouterStub } from './../../../shared/stubs/router.stub';
import { Router } from '@angular/router';
import { UserLoginModel } from './../../models/user/user-login/user-login.model';
import { UserService } from './../../services/user/user.service';
import { ReactiveFormsModule } from '@angular/forms';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, fakeAsync, tick, discardPeriodicTasks } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import * as AuthActions from './../../actions/auth.actions';
import * as fromRoot from './../../../reducers/app-state.reducer';
import * as fromAuth from './../../reducers/auth-state.reducer';
import * as RegistrationPageActions from './../../actions/registration-page.actions';
import { RegistrationPage } from './registration.page';
import { createUserServiceStub } from '../../stubs/services/user-service.stub.spec';
import { MatCheckboxModule, MatButtonModule, MatInputModule } from '@angular/material';
import 'rxjs/add/operator/debounceTime';

describe('[AUTH] [PAGE] REGISTRATION-PAGE', () => {
  let component: RegistrationPage;
  let fixture: ComponentFixture<RegistrationPage>;
  let userloginholder: HTMLElement;
  let emailTxtholder: HTMLElement;
  let phoneTxtholder: HTMLElement;
  let userloginTxtbox: HTMLInputElement;
  let emailTxtbox: HTMLInputElement;
  let phoneTxtbox: HTMLInputElement;
  let passwordTxtholder: HTMLElement;
  let registrationbtn: HTMLButtonElement;
  let userService: UserService;
  let actions: Observable<any>;
  let authStore: Store<fromAuth.State>;
  let userLoginModel: UserLoginModel;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrationPage],
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        CovalentLoadingModule,
        CovalentDialogsModule,
        MatCheckboxModule,
        MatButtonModule,
        MatInputModule,
        StoreModule.forRoot({
          ...fromRoot.routerReducers,
          auth: combineReducers(fromAuth.authStateReducer)
        })
      ],
      providers: [
        { provide: Router, useClass: RouterStub },
        PostApiHelper
      ]
    });
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RegistrationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));
  beforeEach(async(() => {
    userLoginModel = <UserLoginModel>{
      userLogin: 'testUser',
      password: 'P@ssw0rd',
      email: 'test@test.com',
      phoneNumber: 12345678
    };
    userService = createUserServiceStub(true, true, true, null, null);
    userloginholder = fixture.debugElement.query(By.css('#userlogin_holder')).nativeElement;
    emailTxtholder = fixture.debugElement.query(By.css('#email_holder')).nativeElement;
    phoneTxtholder = fixture.debugElement.query(By.css('#phone_holder')).nativeElement;
    passwordTxtholder = fixture.debugElement.query(By.css('#password_holder')).nativeElement;
    registrationbtn = fixture.debugElement.query(By.css('#registration_btn')).nativeElement;
    authStore = TestBed.get(Store);
    spyOn(authStore, 'dispatch').and.callThrough();
  }));
  afterEach(() => {
    component = null;
    fixture = null;
    userloginholder = null;
    emailTxtholder = null;
    phoneTxtholder = null;
    userloginTxtbox = null;
    emailTxtbox = null;
    phoneTxtbox = null;
    passwordTxtholder = null;
    registrationbtn = null;
    userService = null;
    actions = null;
    authStore = null;
    userLoginModel = null;
  });
  describe('Validations', () => {
    describe('Userlogin', () => {
      beforeEach(async(() => {
        component.userLogin.markAsTouched();
        component.userLogin.markAsDirty();
      }));
      describe('Required', () => {
        it('should not show error message when input is pristine and untouched',
          async(() => {
            fixture.whenStable().then(() => {
              component.userLogin.markAsPristine();
              component.userLogin.markAsUntouched();
              expect(userloginholder.children[1]).toBeUndefined();
            });
          }));
        it(`should show error required message when input is touched and dirty,
         input value empty`, async(() => {
            fixture.whenStable().then(() => {
              component.userLogin.setValue('');
              fixture.detectChanges();
              expect(userloginholder.children[1].innerHTML).toContain('User Login is required.');
            });
          }));
        it(`should not show error required message when input is touched and dirty,
         input value is not empty`, async(() => {
            fixture.whenStable().then(() => {
              component.userLogin.setValue('test');
              fixture.detectChanges();
              expect(userloginholder.children[1].innerHTML).not.toContain('User Login is required.');
            });
          }));
      });
      describe('MinLength', () => {
        it(`should show error minlength message when input is touched and dirty,
         input value less than requirement(6)`, async(() => {
            fixture.whenStable().then(() => {
              component.userLogin.setValue('test');
              fixture.detectChanges();
              expect(userloginholder.children[1].textContent).toContain('User Login length should be more than 6 characters.');
            });
          }));
        it(`should not show error minlength message when input is touched and dirty,
         input value more than requirement(6)`, async(() => {
            fixture.whenStable().then(() => {
              component.userLogin.setValue(userLoginModel.userLogin);
              fixture.detectChanges();
              expect(userloginholder.children[1]).toBeUndefined();
            });
          }));
      });
      describe('MaxLength', () => {
        it(`should show error maxlength message when input is touched and dirty,
         input value more than requirement(20)`, async(() => {
            fixture.whenStable().then(() => {
              component.userLogin.setValue('testtesttesttesttesttest');
              fixture.detectChanges();
              expect(userloginholder.children[1].innerHTML).toContain('User Login length should not be more than 20 characters.');
            });
          }));
        it(`should not show error maxlength message when input is touched and dirty,
         input value less than requirement(20)`, async(() => {
            fixture.whenStable().then(() => {
              component.userLogin.setValue(userLoginModel.userLogin);
              fixture.detectChanges();
              expect(userloginholder.children[1]).toBeUndefined();
            });
          }));
      });
      describe('Pattern', () => {
        it(`should show error pattern message when input is touched and dirty,
         input value doesnt match regex pattern`, async(() => {
            fixture.whenStable().then(() => {
              component.userLogin.setValue('TesterUser@');
              fixture.detectChanges();
              expect(userloginholder.children[1].innerHTML)
                .toContain('User Login must contain at least 1 number, 1 character. No Special Characters Allowed.');
            });
          }));
        it(`should not show error pattern message when input is touched and dirty,
         input value does match regex pattern`, async(() => {
            fixture.whenStable().then(() => {
              component.userLogin.setValue(userLoginModel.userLogin);
              fixture.detectChanges();
              expect(userloginholder.children[1]).toBeUndefined();
            });
          }));
      });
    });
    describe('Email', () => {
      beforeEach(async(() => {
        component.email.markAsTouched();
        component.email.markAsDirty();
      }));
      describe('Required', () => {
        it('should not show error message when input is pristine and untouched',
          async(() => {
            fixture.whenStable().then(() => {
              component.email.markAsPristine();
              component.email.markAsUntouched();
              expect(emailTxtholder.children[1]).toBeUndefined();
            });
          }));
        it(`should show error required message when input is touched and dirty,
         input value empty`, async(() => {
            fixture.whenStable().then(() => {
              component.email.setValue('');
              fixture.detectChanges();
              expect(emailTxtholder.children[1].innerHTML).toContain('Email is required.');
            });
          }));
        it(`should not show error required message when input is touched and dirty,
         input value is not empty`, async(() => {
            fixture.whenStable().then(() => {
              component.email.setValue('test');
              fixture.detectChanges();
              expect(emailTxtholder.children[1].innerHTML).not.toContain('Email is required.');
            });
          }));
      });
      describe('MinLength', () => {
        it(`should show error minlength message when input is touched and dirty,
         input value less than requirement(10)`, async(() => {
            fixture.whenStable().then(() => {
              component.email.setValue('test');
              fixture.detectChanges();
              expect(emailTxtholder.children[1].textContent)
                .toContain('Email length should be more than 10 characters.');
            });
          }));
        it(`should not show error minlength message when input is touched and dirty,
         input value more than requirement(10)`, async(() => {
            fixture.whenStable().then(() => {
              component.email.setValue(userLoginModel.email);
              fixture.detectChanges();
              expect(emailTxtholder.children[1]).toBeUndefined();
            });
          }));
      });
      describe('MaxLength', () => {
        it(`should show error maxlength message when input is touched and dirty,
         input value more than requirement(30)`, async(() => {
            fixture.whenStable().then(() => {
              component.email.setValue('testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest');
              fixture.detectChanges();
              expect(emailTxtholder.children[1].innerHTML)
                .toContain('Email length should not be more than 30 characters.');
            });
          }));
        it(`should not show error maxlength message when input is touched and dirty,
         input value less than requirement(30)`, async(() => {
            fixture.whenStable().then(() => {
              component.email.setValue(userLoginModel.email);
              fixture.detectChanges();
              expect(emailTxtholder.children[1]).toBeUndefined();
            });
          }));
      });
      describe('Pattern', () => {
        it(`should show error pattern message when input is touched and dirty,
         input value doesnt match regex pattern`, async(() => {
            fixture.whenStable().then(() => {
              component.email.setValue('TesterUser');
              fixture.detectChanges();
              expect(emailTxtholder.children[1].innerHTML)
                .toContain('Email pattern Error.');
            });
          }));
        it(`should not show error pattern message when input is touched and dirty,
         input value does match regex pattern`, async(() => {
            fixture.whenStable().then(() => {
              component.email.setValue(userLoginModel.email);
              fixture.detectChanges();
              expect(emailTxtholder.children[1]).toBeUndefined();
            });
          }));
      });
    });
    describe('Phone', () => {
      beforeEach(async(() => {
        component.phoneNumber.markAsTouched();
        component.phoneNumber.markAsDirty();
      }));
      describe('Required', () => {
        it('should not show error message when input is pristine and untouched',
          async(() => {
            fixture.whenStable().then(() => {
              component.phoneNumber.markAsPristine();
              component.phoneNumber.markAsUntouched();
              expect(phoneTxtholder.children[1]).toBeUndefined();
            });
          }));
        it(`should show error required message when input is touched and dirty,
         input value empty`, async(() => {
            fixture.whenStable().then(() => {
              component.phoneNumber.setValue('');
              fixture.detectChanges();
              expect(phoneTxtholder.children[1].innerHTML).toContain('Phone is required.');
            });
          }));
        it(`should not show error required message when input is touched and dirty,
         input value is not empty`, async(() => {
            fixture.whenStable().then(() => {
              component.phoneNumber.setValue('1');
              fixture.detectChanges();
              expect(phoneTxtholder.children[1].innerHTML).not.toContain('Phone is required.');
            });
          }));
      });
      describe('MinLength', () => {
        it(`should show error minlength message when input is touched and dirty,
         input value less than requirement(8)`, async(() => {
            fixture.whenStable().then(() => {
              component.phoneNumber.setValue('1234');
              fixture.detectChanges();
              expect(phoneTxtholder.children[1].textContent)
                .toContain('Phone length should be more than 8 characters.');
            });
          }));
        it(`should not show error minlength message when input is touched and dirty,
         input value more than requirement(8)`, async(() => {
            fixture.whenStable().then(() => {
              component.phoneNumber.setValue(userLoginModel.phoneNumber);
              fixture.detectChanges();
              expect(phoneTxtholder.children[1]).toBeUndefined();
            });
          }));
      });
      describe('MaxLength', () => {
        it(`should show error maxlength message when input is touched and dirty,
         input value more than requirement(15)`, async(() => {
            fixture.whenStable().then(() => {
              component.phoneNumber.setValue('1234567890123456');
              fixture.detectChanges();
              expect(phoneTxtholder.children[1].innerHTML)
                .toContain('Phone length should not be more than 15 characters.');
            });
          }));
        it(`should not show error maxlength message when input is touched and dirty,
         input value less than requirement(15)`, async(() => {
            fixture.whenStable().then(() => {
              component.phoneNumber.setValue(userLoginModel.phoneNumber);
              fixture.detectChanges();
              expect(phoneTxtholder.children[1]).toBeUndefined();
            });
          }));
      });
      describe('Pattern', () => {
        it(`should show error pattern message when input is touched and dirty,
         input value doesnt match regex pattern`, async(() => {
            fixture.whenStable().then(() => {
              component.phoneNumber.setValue('TesterUser');
              fixture.detectChanges();
              expect(phoneTxtholder.children[1].innerHTML)
                .toContain('Phone Only Number Allowed');
            });
          }));
        it(`should not show error pattern message when input is touched and dirty,
         input value does match regex pattern`, async(() => {
            fixture.whenStable().then(() => {
              component.phoneNumber.setValue(userLoginModel.phoneNumber);
              fixture.detectChanges();
              expect(phoneTxtholder.children[1]).toBeUndefined();
            });
          }));
      });
    });
    describe('Password', () => {
      beforeEach(async(() => {
        component.password.markAsTouched();
        component.password.markAsDirty();
      }));
      describe('Required', () => {
        it('should not show error message when input is pristine and untouched',
          async(() => {
            fixture.whenStable().then(() => {
              component.password.markAsPristine();
              component.password.markAsUntouched();
              expect(passwordTxtholder.children[1]).toBeUndefined();
            });
          }));
        it(`should show error required message when input is touched and dirty,
         input value empty`, async(() => {
            fixture.whenStable().then(() => {
              component.password.setValue('');
              fixture.detectChanges();
              expect(passwordTxtholder.children[1].innerHTML).toContain('Password is required.');
            });
          }));
        it(`should not show error required message when input is touched and dirty,
         input value is not empty`, async(() => {
            fixture.whenStable().then(() => {
              component.password.setValue('1');
              fixture.detectChanges();
              expect(passwordTxtholder.children[1].innerHTML).not.toContain('Password is required.');
            });
          }));
      });
      describe('MinLength', () => {
        it(`should show error minlength message when input is touched and dirty,
         input value less than requirement(8)`, async(() => {
            fixture.whenStable().then(() => {
              component.password.setValue('1234');
              fixture.detectChanges();
              expect(passwordTxtholder.children[1].textContent)
                .toContain('Password length should be more than 8 characters.');
            });
          }));
        it(`should not show error minlength message when input is touched and dirty,
         input value more than requirement(8)`, async(() => {
            fixture.whenStable().then(() => {
              component.password.setValue(userLoginModel.password);
              fixture.detectChanges();
              expect(passwordTxtholder.children[1]).toBeUndefined();
            });
          }));
      });
      describe('MaxLength', () => {
        it(`should show error maxlength message when input is touched and dirty,
         input value more than requirement(15)`, async(() => {
            fixture.whenStable().then(() => {
              component.password.setValue('P@ssw0rdP@ssw0rdP@ssw0rd');
              fixture.detectChanges();
              expect(passwordTxtholder.children[1].innerHTML)
                .toContain('Password length should not be more than 15 characters.');
            });
          }));
        it(`should not show error maxlength message when input is touched and dirty,
         input value less than requirement(15)`, async(() => {
            fixture.whenStable().then(() => {
              component.password.setValue(userLoginModel.password);
              fixture.detectChanges();
              expect(passwordTxtholder.children[1]).toBeUndefined();
            });
          }));
      });
      describe('Pattern', () => {
        it(`should show error pattern message when input is touched and dirty,
         input value doesnt match regex pattern`, async(() => {
            fixture.whenStable().then(() => {
              component.password.setValue('Password');
              fixture.detectChanges();
              expect(passwordTxtholder.children[1].innerHTML)
                .toContain('Password at least one uppercase letter, one lowercase letter, one number and one special character');
            });
          }));
        it(`should not show error pattern message when input is touched and dirty,
         input value does match regex pattern`, async(() => {
            fixture.whenStable().then(() => {
              component.password.setValue(userLoginModel.password);
              fixture.detectChanges();
              expect(passwordTxtholder.children[1]).toBeUndefined();
            });
          }));
      });
    });
  });
  describe('Complex Tests', () => {
    beforeEach(async(() => {
      userloginTxtbox = (<HTMLInputElement>component.userloginTxtBox.nativeElement);
      emailTxtbox = (<HTMLInputElement>component.emailTxtBox.nativeElement);
      phoneTxtbox = (<HTMLInputElement>component.phoneTxtBox.nativeElement);
    }));
    describe('UserLogin', () => {
      describe('Backend', () => {
        it(`should subscribe event input debounceTime (1500) and dispatch ValidateUserLogin action,
         when dispatch input phone`, fakeAsync(() => {
            spyOn(component, 'checkUserLogin').and.callThrough();
            userloginTxtbox.value = userLoginModel.userLogin;
            userloginTxtbox.dispatchEvent(new Event('input'));
            tick(1499);
            expect(component.checkUserLogin).not.toHaveBeenCalledWith(userLoginModel.userLogin);
            tick(1500);
            expect(component.checkUserLogin).toHaveBeenCalledWith(userLoginModel.userLogin);
            expect(authStore.dispatch)
              .toHaveBeenCalledWith(new RegistrationPageActions.ValidateUserLogin(userLoginModel.userLogin));
          }));
        it(`should show error backend message when input is touched and dirty,
         dispatch ValidateUserLoginError action`, fakeAsync(() => {
            spyOn(component, 'checkUserLogin').and.callFake(() =>
              authStore.dispatch(
                new RegistrationPageActions.ValidateUserLoginError(new Error('UserLogin already registered')))
            );
            userloginTxtbox.value = userLoginModel.userLogin;
            userloginTxtbox.dispatchEvent(new Event('input'));
            tick(1500);
            expect(authStore.dispatch).toHaveBeenCalledWith(
              new RegistrationPageActions.ValidateUserLoginError(new Error('UserLogin already registered'))
            );
            fixture.detectChanges();
            expect(userloginholder.children[1].textContent).toContain('UserLogin already registered');
          }));
        it(`should not show error backend message when input is touched and dirty,
          dispatch ValidateUserLoginSuccess action`, fakeAsync(() => {
            spyOn(component, 'checkUserLogin').and.callFake(() =>
              authStore.dispatch(
                new RegistrationPageActions.ValidateUserLoginSuccess())
            );
            userloginTxtbox.value = userLoginModel.userLogin;
            userloginTxtbox.dispatchEvent(new Event('input'));
            tick(1500);
            expect(authStore.dispatch).toHaveBeenCalledWith(
              new RegistrationPageActions.ValidateUserLoginSuccess());
            fixture.detectChanges();
            expect(userloginholder.children[1]).toBeUndefined();
          }));
      });
    });
    describe('Phone', () => {
      describe('Backend', () => {
        it(`should subscribe event input debounceTime (1500) and dispatch ValidatePhone action,
         when dispatch input phone`, fakeAsync(() => {
            spyOn(component, 'checkPhone').and.callThrough();
            phoneTxtbox.value = userLoginModel.phoneNumber.toString();
            phoneTxtbox.dispatchEvent(new Event('input'));
            tick(1499);
            expect(component.checkPhone).not.toHaveBeenCalledWith(userLoginModel.phoneNumber.toString());
            tick(1500);
            expect(component.checkPhone).toHaveBeenCalledWith(userLoginModel.phoneNumber.toString());
            expect(authStore.dispatch)
              .toHaveBeenCalledWith(new RegistrationPageActions.ValidatePhone(userLoginModel.phoneNumber.toString()));
          }));
        it(`should show error backend message when input is touched and dirty,
         dispatch ValidatePhoneError action`, fakeAsync(() => {
            spyOn(component, 'checkPhone').and.callFake(() =>
              authStore.dispatch(
                new RegistrationPageActions.ValidatePhoneError(new Error('Phone already registered')))
            );
            phoneTxtbox.value = userLoginModel.phoneNumber.toString();
            phoneTxtbox.dispatchEvent(new Event('input'));
            tick(1500);
            expect(authStore.dispatch).toHaveBeenCalledWith(
              new RegistrationPageActions.ValidatePhoneError(new Error('Phone already registered'))
            );
            fixture.detectChanges();
            expect(phoneTxtholder.children[1].textContent).toContain('Phone already registered');
          }));
        it(`should not show error backend message when input is touched and dirty,
          dispatch ValidatePhoneSuccess action`, fakeAsync(() => {
            spyOn(component, 'checkPhone').and.callFake(() =>
              authStore.dispatch(
                new RegistrationPageActions.ValidatePhoneSuccess())
            );
            phoneTxtbox.value = userLoginModel.phoneNumber.toString();
            phoneTxtbox.dispatchEvent(new Event('input'));
            tick(1500);
            expect(authStore.dispatch).toHaveBeenCalledWith(
              new RegistrationPageActions.ValidatePhoneSuccess());
            fixture.detectChanges();
            expect(phoneTxtholder.children[1]).toBeUndefined();
          }));
      });
    });
    describe('Email', () => {
      describe('Backend', () => {
        it(`should subscribe event input debounceTime (1500) and dispatch ValidateEmail action,
         when dispatch input email`, fakeAsync(() => {
            spyOn(component, 'checkEmail').and.callThrough();
            emailTxtbox.value = userLoginModel.email;
            emailTxtbox.dispatchEvent(new Event('input'));
            tick(1499);
            expect(component.checkEmail).not.toHaveBeenCalledWith(userLoginModel.email);
            tick(1500);
            expect(component.checkEmail).toHaveBeenCalledWith(userLoginModel.email);
            expect(authStore.dispatch)
              .toHaveBeenCalledWith(new RegistrationPageActions.ValidateEmail(userLoginModel.email));
          }));
        it(`should show error backend message when input is touched and dirty,
         dispatch ValidateEmailError action`, fakeAsync(() => {
            spyOn(component, 'checkEmail').and.callFake(() =>
              authStore.dispatch(
                new RegistrationPageActions.ValidateEmailError(new Error('Email already registered')))
            );
            emailTxtbox.value = userLoginModel.email;
            emailTxtbox.dispatchEvent(new Event('input'));
            tick(1500);
            expect(authStore.dispatch).toHaveBeenCalledWith(
              new RegistrationPageActions.ValidateEmailError(new Error('Email already registered'))
            );
            fixture.detectChanges();
            expect(emailTxtholder.children[1].textContent).toContain('Email already registered');
          }));
        it(`should not show error backend message when input is touched and dirty,
          dispatch ValidateEmailSuccess action`, fakeAsync(() => {
            spyOn(component, 'checkEmail').and.callFake(() =>
              authStore.dispatch(
                new RegistrationPageActions.ValidateEmailSuccess())
            );
            emailTxtbox.value = userLoginModel.email;
            emailTxtbox.dispatchEvent(new Event('input'));
            tick(1500);
            expect(authStore.dispatch).toHaveBeenCalledWith(
              new RegistrationPageActions.ValidateEmailSuccess());
            fixture.detectChanges();
            expect(emailTxtholder.children[1]).toBeUndefined();
          }));
      });
    });
  });
  describe('UI Tests', () => {
    it('should enabled button when form is valid', async(() => {
      fixture.whenStable().then(() => {
        component.userLogin.setValue(userLoginModel.userLogin);
        component.email.setValue(userLoginModel.email);
        component.password.setValue(userLoginModel.password);
        component.phoneNumber.setValue(userLoginModel.phoneNumber);
        fixture.detectChanges();
        expect(component.registrationForm.valid).toBeTruthy();
        expect(registrationbtn.disabled).toBeFalsy();
      });
    }));
    it('should disabled button when form is not valid', async(() => {
      fixture.whenStable().then(() => {
        component.userLogin.setValue('userLoginModel.userLogin');
        component.email.setValue('userLoginModel.email');
        component.password.setValue('userLoginModel.password');
        component.phoneNumber.setValue('userLoginModel.phoneNumber');
        fixture.detectChanges();
        expect(component.registrationForm.valid).toBeFalsy();
        expect(registrationbtn.disabled).toBeTruthy();
      });
    }));
  });
  describe('Functionality Tests', () => {
    it(`should trigger onRegistrationForm_Submit Event and emit Registration Action,
      when form is submitted`, async(() => {
        fixture.whenStable().then(() => {
          spyOn(component, 'onRegistrationForm_Submit').and.callThrough();
          component.userLogin.setValue(userLoginModel.userLogin);
          component.email.setValue(userLoginModel.email);
          component.password.setValue(userLoginModel.password);
          component.phoneNumber.setValue(userLoginModel.phoneNumber);
          fixture.detectChanges();
          registrationbtn.click();
          expect(component.onRegistrationForm_Submit).toHaveBeenCalled();
          expect(authStore.dispatch).toHaveBeenCalledWith(new AuthActions.Registration(userLoginModel));
        });
      }));
  });
});
