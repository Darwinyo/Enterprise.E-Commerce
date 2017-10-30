import * as ProductActions from './../actions/product.actions';

// NOTE: state is will be changed
export interface State {
    pending: boolean;
    error: Error | null;
}
export const INITIAL_STATE = {
    pending: false,
    error: null
};
export function productReducer(state = INITIAL_STATE, action: ProductActions.Actions): State {
    switch (action.type) {
        case ProductActions.REVIEW_PRODUCT: {
            return {
                ...state
            };
        }
        default:
            return state;
    }
}
