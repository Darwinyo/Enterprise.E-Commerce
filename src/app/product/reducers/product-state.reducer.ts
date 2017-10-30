import * as fromProduct from './../../product/reducers/product.reducer';
import * as fromCore from './../../core/reducers/core-state.reducer';
export interface ProductState {
    productState: fromProduct.State;
}

export interface State extends fromCore.State {
    productState: ProductState;
}

export const productStateReducer = {
    productState: fromProduct.productReducer
};
