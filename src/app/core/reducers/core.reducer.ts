import { ConfirmModel } from './../../shared/models/dialogs/confirm.model';
import { AlertModel } from './../../shared/models/dialogs/alert.model';
import * as CoreActions from './../actions/core.actions';

export interface State {
    alert: AlertModel | null;
    error: AlertModel | null;
    confirm: ConfirmModel | null;
}
export const INITIAL_STATE = {
    alert: null,
    error: null,
    confirm: null
};
export function coreReducer(state = INITIAL_STATE, action: CoreActions.Actions): State {
    switch (action.type) {
        case CoreActions.ALERT: {
            return {
                ...state,
                alert: (<CoreActions.Alert>action).payload
            };
        }
        case CoreActions.ERROR: {
            return {
                ...state,
                error: (<CoreActions.Errors>action).payload
            };
        }
        case CoreActions.CONFIRM: {
            return {
                ...state,
                confirm: (<CoreActions.Confirm>action).payload
            };
        }
        case CoreActions.CLEAR: {
            return {
                ...state,
                alert: null,
                error: null,
                confirm: null
            };
        }
        default:
            return state;
    }
}

export const getAlert = (state: State) => state.alert;
export const getError = (state: State) => state.error;
export const getConfirm = (state: State) => state.confirm;
