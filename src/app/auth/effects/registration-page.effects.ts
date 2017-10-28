import { Observable } from 'rxjs/Observable';
//#region imports
import { Store } from '@ngrx/store';
import { UserService } from './../services/user/user.service';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/map';
import * as RegistrationPageActions from './../actions/registration-page.actions';
//#endregion
@Injectable()
export class RegistrationPageEffects {
    @Effect()
    validateUserLogin$ = this.actions$
        .ofType(RegistrationPageActions.VALIDATE_USER_LOGIN)
        .map((action: RegistrationPageActions.ValidateUserLogin) => action.payload)
        .exhaustMap(userlogin =>
            this.userService.checkUserLogin(userlogin)
                .map(response => {
                    if (!response) {
                        return new RegistrationPageActions.ValidateUserLoginSuccess();
                    } else {
                        throw new Error('Userlogin already registered');
                    }
                }).catch((err: Error) => Observable.of(new RegistrationPageActions.ValidateUserLoginError(err))));
    @Effect()
    validateEmail$ = this.actions$
        .ofType(RegistrationPageActions.VALIDATE_EMAIL)
        .map((action: RegistrationPageActions.ValidateEmail) => action.payload)
        .switchMap((email) =>
            this.userService.checkEmail(email)
                .map(response => {
                    if (!response) {
                        return new RegistrationPageActions.ValidateEmailSuccess();
                    } else {
                        throw new Error('Email already registered');
                    }
                }).catch((err: Error) => Observable.of(new RegistrationPageActions.ValidateEmailError(err))));
    @Effect()
    validatePhone$ = this.actions$
        .ofType(RegistrationPageActions.VALIDATE_PHONE)
        .map((action: RegistrationPageActions.ValidatePhone) => action.payload)
        .switchMap((phone) =>
            this.userService.checkPhone(phone)
                .map(response => {
                    if (!response) {
                        return new RegistrationPageActions.ValidatePhoneSuccess();
                    } else {
                        throw new Error('Phone already registered');
                    }
                }).catch((err: Error) => Observable.of(new RegistrationPageActions.ValidatePhoneError(err))));

    @Effect({ dispatch: false })
    ValidateUserLoginSuccess$ = this.actions$
        .ofType(RegistrationPageActions.VALIDATE_USER_LOGIN_SUCCESS)
        .do(() => console.log('User Login Server Side Validation Success'));

    @Effect({ dispatch: false })
    ValidateEmailSuccess$ = this.actions$
        .ofType(RegistrationPageActions.VALIDATE_EMAIL_SUCCESS)
        .do(() => console.log('Email Server Side Validation Success'));

    @Effect({ dispatch: false })
    ValidatePhoneSuccess$ = this.actions$
        .ofType(RegistrationPageActions.VALIDATE_PHONE_SUCCESS)
        .do(() => console.log('Phone Server Side Validation Success'));

    @Effect({ dispatch: false })
    ValidateUserLoginError$ = this.actions$
        .ofType(RegistrationPageActions.VALIDATE_USER_LOGIN_ERROR)
        .map((action: RegistrationPageActions.ValidateUserLoginError) => action.payload)
        .do(err => console.log(err));

    @Effect({ dispatch: false })
    ValidateEmailError$ = this.actions$
        .ofType(RegistrationPageActions.VALIDATE_EMAIL_ERROR)
        .map((action: RegistrationPageActions.ValidateEmailError) => action.payload)
        .do(err => console.log(err));

    @Effect({ dispatch: false })
    ValidatePhoneError$ = this.actions$
        .ofType(RegistrationPageActions.VALIDATE_PHONE_ERROR)
        .map((action: RegistrationPageActions.ValidatePhoneError) => action.payload)
        .do(err => console.log(err));

    constructor(
        private actions$: Actions,
        private userService: UserService
    ) { }
}
