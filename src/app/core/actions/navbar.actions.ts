import { UserLoginViewModel } from './../../auth/viewmodels/user-login/user-login.viewmodel';
import { Action } from '@ngrx/store';
export const TOGGLE_LOGIN = '[NAVBAR] TOGGLE_LOGIN';
export const NAV_LOGGED = '[NAVBAR] NAV_LOGGED';
export const SEARCH = '[NAVBAR] SEARCH';
export const SEARCH_COMPLETED = '[NAVBAR] SEARCH_COMPLETED';
export const SEARCH_FAILURE = '[NAVBAR] SEARCH_FAILURE';

export class ToggleLogin implements Action {
    readonly type: string = TOGGLE_LOGIN;
}
export class NavLogged implements Action {
    readonly type: string = NAV_LOGGED;
}
export class Search implements Action {
    readonly type: string = SEARCH;
}
export class SearchCompleted implements Action {
    readonly type: string = SEARCH_COMPLETED;
}
export class SearchFailure implements Action {
    readonly type: string = SEARCH_FAILURE;
}
export type Actions =
    | ToggleLogin
    | NavLogged
    | Search
    | SearchCompleted
    | SearchFailure;
