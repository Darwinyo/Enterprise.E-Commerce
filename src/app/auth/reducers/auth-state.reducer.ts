import * as fromAuth from './auth.reducer';
import * as fromLoginPage from './login-page.reducer';
import * as fromRegistrationPage from './registration-page.reducer';
import * as fromRoot from './../../reducers/app-state.reducer';
import * as fromLoginNavComponent from './../reducers/login-nav-component.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface AuthState {
    userState: fromAuth.State;
    loginPageState: fromLoginPage.State;
    registrationPageState: fromRegistrationPage.State;
    loginNavComponentState: fromLoginNavComponent.State;
}

export interface State extends fromRoot.State {
    authState: AuthState;
}

export const authStateReducer = {
    userState: fromAuth.authReducer,
    loginPageState: fromLoginPage.loginPageReducer,
    registrationPageState: fromRegistrationPage.registrationPageReducer,
    loginNavComponentState: fromLoginNavComponent.loginNavComponentReducer
};

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectUserState = createSelector(
    selectAuthState,
    (state: AuthState) => state.userState
);
export const getLoggedIn = createSelector(
    selectUserState,
    fromAuth.getLoggedIn
);
export const getUserLogin = createSelector(
    selectUserState,
    fromAuth.getUserLogin
);
export const getuserKey = createSelector(
    selectUserState,
    fromAuth.getUserKey
);

export const selectLoginPageState = createSelector(
    selectAuthState,
    (state: AuthState) => state.loginPageState
);

export const getLoginPageError = createSelector(
    selectLoginPageState,
    fromLoginPage.getLoginPageError
);
export const getLoginPagePending = createSelector(
    selectLoginPageState,
    fromLoginPage.getLoginPagePending
);
export const getLoginPageisPasswordShow = createSelector(
    selectLoginPageState,
    fromLoginPage.getLoginPageisPasswordShow
);

export const selectRegistrationPageState = createSelector(
    selectAuthState,
    (state: AuthState) => state.registrationPageState
);

export const getRegistrationPageError = createSelector(
    selectRegistrationPageState,
    fromRegistrationPage.getRegistrationPageError
);
export const getRegistrationPagePending = createSelector(
    selectRegistrationPageState,
    fromRegistrationPage.getRegistrationPagePending
);
export const getRegistrationPageEmailValidationError = createSelector(
    selectRegistrationPageState,
    fromRegistrationPage.getRegistrationPageEmailValidationError
);
export const getRegistrationPagePhoneValidationError = createSelector(
    selectRegistrationPageState,
    fromRegistrationPage.getRegistrationPagePhoneValidationError
);
export const getRegistrationPageUserLoginValidationError = createSelector(
    selectRegistrationPageState,
    fromRegistrationPage.getRegistrationPageUserLoginValidationError
);

export const selectLoginNavComponentState = createSelector(
    selectAuthState,
    (state: AuthState) => state.loginNavComponentState
);
export const getLoginNavComponentError = createSelector(
    selectLoginNavComponentState,
    fromLoginNavComponent.getLoginNavComponentError
);
export const getLoginNavComponentPending = createSelector(
    selectLoginNavComponentState,
    fromLoginNavComponent.getLoginNavComponentPending
);
export const getLoginNavComponentIsPasswordShow = createSelector(
    selectLoginNavComponentState,
    fromLoginNavComponent.getLoginNavComponentIsPasswordShow
);
