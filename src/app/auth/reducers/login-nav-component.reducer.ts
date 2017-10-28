import * as AuthActions from './../actions/auth.actions';
import * as LoginNavComponentActions from './../actions/login-nav-component.actions';
export interface State {
    isPasswordShow: boolean;
    pending: boolean;
    error: Error | null;
}
export const INITIAL_STATE = {
    isPasswordShow: false,
    pending: false,
    error: null
};
export function loginNavComponentReducer(state = INITIAL_STATE, action: AuthActions.Actions | LoginNavComponentActions.Actions): State {
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
                error: (<AuthActions.LoginFailure>action).payload,
                pending: false
            };
        }

        case LoginNavComponentActions.TOGGLE_PASSWORD: {
            return {
                ...state,
                isPasswordShow: !state.isPasswordShow
            };
        }

        default:
            return state;
    }
}

export const getLoginNavComponentError = (state: State) => state.error;
export const getLoginNavComponentPending = (state: State) => state.pending;
export const getLoginNavComponentIsPasswordShow = (state: State) => state.isPasswordShow;
