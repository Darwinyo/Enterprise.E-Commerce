import { UserLoginModel } from './../models/user/user-login/user-login.model';
import { Action } from '@ngrx/store';

export const VALIDATE_USER_LOGIN = '[AUTH] [REGISTRATION_PAGE] VALIDATE_USER_LOGIN';
export const VALIDATE_EMAIL = '[AUTH] [REGISTRATION_PAGE] VALIDATE_EMAIL';
export const VALIDATE_PHONE = '[AUTH] [REGISTRATION_PAGE] VALIDATE_PHONE';
export const VALIDATE_USER_LOGIN_SUCCESS = '[AUTH] [REGISTRATION_PAGE] VALIDATE_USER_LOGIN_SUCCESS';
export const VALIDATE_EMAIL_SUCCESS = '[AUTH] [REGISTRATION_PAGE] VALIDATE_EMAIL_SUCCESS';
export const VALIDATE_PHONE_SUCCESS = '[AUTH] [REGISTRATION_PAGE] VALIDATE_PHONE_SUCCESS';
export const VALIDATE_USER_LOGIN_ERROR = '[AUTH] [REGISTRATION_PAGE] VALIDATE_USER_LOGIN_ERROR';
export const VALIDATE_EMAIL_ERROR = '[AUTH] [REGISTRATION_PAGE] VALIDATE_EMAIL_ERROR';
export const VALIDATE_PHONE_ERROR = '[AUTH] [REGISTRATION_PAGE] VALIDATE_PHONE_ERROR';

export class ValidateUserLogin implements Action {
    readonly type: string = VALIDATE_USER_LOGIN;
    constructor(public payload: string) { }
}
export class ValidateEmail implements Action {
    readonly type: string = VALIDATE_EMAIL;
    constructor(public payload: string) { }
}
export class ValidatePhone implements Action {
    readonly type: string = VALIDATE_PHONE;
    constructor(public payload: string) { }
}
export class ValidateUserLoginSuccess implements Action {
    readonly type: string = VALIDATE_USER_LOGIN_SUCCESS;
}
export class ValidateEmailSuccess implements Action {
    readonly type: string = VALIDATE_EMAIL_SUCCESS;
}
export class ValidatePhoneSuccess implements Action {
    readonly type: string = VALIDATE_PHONE_SUCCESS;
}
export class ValidateUserLoginError implements Action {
    readonly type: string = VALIDATE_USER_LOGIN_ERROR;
    constructor(public payload: Error) { }
}
export class ValidateEmailError implements Action {
    readonly type: string = VALIDATE_EMAIL_ERROR;
    constructor(public payload: Error) { }
}
export class ValidatePhoneError implements Action {
    readonly type: string = VALIDATE_PHONE_ERROR;
    constructor(public payload: Error) { }
}
export type Actions =
    ValidateUserLogin |
    ValidateEmail |
    ValidatePhone |
    ValidateUserLoginError |
    ValidateEmailError |
    ValidatePhoneError |
    ValidateUserLoginSuccess |
    ValidateEmailSuccess |
    ValidatePhoneSuccess;
