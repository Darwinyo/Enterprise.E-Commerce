import { Action } from '@ngrx/store';
export const TOGGLE_PASSWORD = '[AUTH] [LOGIN_NAV_COMPONENT] TOGGLE_PASSWORD';

export class TogglePassword implements Action {
    readonly type: string = TOGGLE_PASSWORD;
}
export type Actions = TogglePassword;
