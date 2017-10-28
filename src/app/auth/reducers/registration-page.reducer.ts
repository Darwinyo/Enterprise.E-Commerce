import * as AuthActions from './../actions/auth.actions';
import * as RegistrationPageActions from './../actions/registration-page.actions';

export interface State {
    error: Error | null;
    pending: boolean;
    userLoginValidationError: Error | null;
    emailValidationError: Error | null;
    phoneValidationError: Error | null;
}

export const INITIAL_STATE: State = {
    error: null,
    pending: false,
    userLoginValidationError: null,
    emailValidationError: null,
    phoneValidationError: null
};

export function registrationPageReducer(state = INITIAL_STATE,
    action: AuthActions.Actions | RegistrationPageActions.Actions): State {
    switch (action.type) {
        case AuthActions.REGISTRATION: {
            return {
                ...state,
                pending: true,
                error: null
            };
        }

        case AuthActions.REGISTRATION_FAILURE: {
            return {
                ...state,
                pending: false,
                error: (<AuthActions.RegistrationFailure>action).payload
            };
        }

        case AuthActions.REGISTRATION_SUCCESS: {
            return {
                ...state,
                pending: false,
                error: null
            };
        }

        case RegistrationPageActions.VALIDATE_EMAIL ||
            RegistrationPageActions.VALIDATE_EMAIL_SUCCESS: {
                return {
                    ...state,
                    emailValidationError: null,
                };
            }

        case RegistrationPageActions.VALIDATE_PHONE ||
            RegistrationPageActions.VALIDATE_PHONE_SUCCESS: {
                return {
                    ...state,
                    phoneValidationError: null,
                };
            }

        case RegistrationPageActions.VALIDATE_USER_LOGIN ||
            RegistrationPageActions.VALIDATE_USER_LOGIN_SUCCESS: {
                return {
                    ...state,
                    userLoginValidationError: null,
                };
            }
        case RegistrationPageActions.VALIDATE_USER_LOGIN_ERROR: {
            return {
                ...state,
                userLoginValidationError: (<RegistrationPageActions.ValidateUserLoginError>action).payload,
            };
        }

        case RegistrationPageActions.VALIDATE_PHONE_ERROR: {
            return {
                ...state,
                phoneValidationError: (<RegistrationPageActions.ValidatePhoneError>action).payload,
            };
        }

        case RegistrationPageActions.VALIDATE_EMAIL_ERROR: {
            return {
                ...state,
                emailValidationError: (<RegistrationPageActions.ValidateEmailError>action).payload,
            };
        }

        default:
            return state;
    }
}

export const getRegistrationPageError = (state: State) => state.error;
export const getRegistrationPagePending = (state: State) => state.pending;
export const getRegistrationPageUserLoginValidationError = (state: State) => state.userLoginValidationError;
export const getRegistrationPageEmailValidationError = (state: State) => state.emailValidationError;
export const getRegistrationPagePhoneValidationError = (state: State) => state.phoneValidationError;
