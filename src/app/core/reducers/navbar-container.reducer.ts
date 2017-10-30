import * as fromAuth from './../../auth/reducers/auth-state.reducer';
import * as NavbarContainerActions from './../actions/navbar-container.actions';
export interface State {
    logged: boolean;
    loginMenuDropped: boolean;
}

export const INITIAL_STATE = {
    logged: false,
    loginMenuDropped: false
};

export function navbarContainerReducer(state = INITIAL_STATE, action: NavbarContainerActions.Actions): State {
    switch (action.type) {
        case NavbarContainerActions.NAV_LOGGED: {
            return {
                ...state,
                logged: !state.logged
            };
        }
        case NavbarContainerActions.TOGGLE_LOGIN: {
            return {
                ...state,
                loginMenuDropped: !state.loginMenuDropped
            };
        }
        default:
            return state;
    }
}

export const getNavbarContainerLoginMenu = (state: State) => state.loginMenuDropped;
export const getNavbarContainerLogged = (state: State) => state.logged;
