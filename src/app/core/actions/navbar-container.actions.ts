import { Action } from '@ngrx/store';
export const TOGGLE_LOGIN = '[CORE] [NAVBAR_CONTAINER] TOGGLE_LOGIN';
export const NAV_LOGGED = '[CORE] [NAVBAR_CONTAINER] NAV_LOGGED';

export class ToggleLogin implements Action {
    readonly type: string = TOGGLE_LOGIN;
}
export class NavLogged implements Action {
    readonly type: string = NAV_LOGGED;
}
export type Actions =
    | ToggleLogin
    | NavLogged;
