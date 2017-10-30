import * as NavSearchbarComponentActions from './../actions/nav-searchbar-component.actions';
export interface State {
    pending: boolean;
    error: Error | null;
}

export const INITIAL_STATE = {
    pending: false,
    error: null
};

export function navbarContainerReducer(state = INITIAL_STATE, action: NavSearchbarComponentActions.Actions): State {
    switch (action.type) {
        case NavSearchbarComponentActions.SEARCH: {
            return {
                ...state,
                pending: true
            };
        }
        case NavSearchbarComponentActions.SEARCH_COMPLETED: {
            return {
                ...state,
                pending: false,
                error: null
            };
        }
        case NavSearchbarComponentActions.SEARCH_FAILURE: {
            return {
                ...state,
                pending: false,
                error: (<NavSearchbarComponentActions.SearchFailure>action).payload
            };
        }
        default:
            return state;
    }
}

export const getNavSearchbarComponentPending = (state: State) => state.pending;
export const getNavSearchbarComponentError = (state: State) => state.error;
