import { createSelector } from '@ngrx/store';
import * as AuthActions from './../actions/auth.actions';
import { Login, LoginFailure } from './../actions/auth.actions';
import * as LoginPageActions from './../actions/login-page.actions';

export interface State {
    error: Error | null;
    pending: boolean;
    isPasswordShow: boolean;
}

export const INITIAL_STATE: State = {
    error: null,
    pending: false,
    isPasswordShow: false
};

export function loginPageReducer(state = INITIAL_STATE, action: AuthActions.Actions | LoginPageActions.Actions): State {
    switch (action.type) {
        case AuthActions.LOG_IN: {
            return {
                ...state,
                pending: true
            };
        }

        case AuthActions.LOG_IN_SUCCESS: {
            return {
                ...state,
                error: null,
                pending: false
            };
        }

        case AuthActions.LOG_IN_FAILURE: {
            return {
                ...state,
                error: (<LoginFailure>action).payload,
                pending: false
            };
        }

        case LoginPageActions.TOGGLE_PASSWORD: {
            return {
                ...state,
                isPasswordShow: !state.isPasswordShow
            };
        }

        default:
            return state;
    }
}

export const getLoginPageError = (state: State) => state.error;
export const getLoginPagePending = (state: State) => state.pending;
export const getLoginPageisPasswordShow = (state: State) => state.isPasswordShow;
