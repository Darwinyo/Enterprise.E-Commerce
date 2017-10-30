import { AlertModel } from './../../shared/models/dialogs/alert.model';
import { ConfirmModel } from './../../shared/models/dialogs/confirm.model';
import { Action } from '@ngrx/store';
export const ALERT = '[CORE] ALERT';
export const CONFIRM = '[CORE] CONFIRM';
export const ERROR = '[CORE] ERROR';
export const CLEAR = '[CORE] CLEAR';

export class Alert implements Action {
    readonly type: string = ALERT;
    constructor(public payload: AlertModel) { }
}

export class Confirm implements Action {
    readonly type: string = CONFIRM;
    constructor(public payload: ConfirmModel) { }
}

export class Errors implements Action {
    readonly type: string = ERROR;
    constructor(public payload: AlertModel) { }
}

export class Clear implements Action {
    readonly type: string = CLEAR;
}

export type Actions =
    Alert |
    Confirm |
    Errors |
    Clear;
