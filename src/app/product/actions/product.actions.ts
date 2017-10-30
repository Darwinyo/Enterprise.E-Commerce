import { Action } from '@ngrx/store';

export const REVIEW_PRODUCT = '[PRODUCT] REVIEW_PRODUCT';

export class ReviewProduct implements Action {
    readonly type: string = REVIEW_PRODUCT;
    constructor(public payload: string) { }
}
export type Actions =
    ReviewProduct;
