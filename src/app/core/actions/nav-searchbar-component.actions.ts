import { SearchViewModel } from './../viewmodels/search/search.viewmodel';
import { Action } from '@ngrx/store';

export const SEARCH = '[CORE] [NAV_SEARCHBAR_COMPONENT] SEARCH';
export const SEARCH_COMPLETED = '[CORE] [NAV_SEARCHBAR_COMPONENT] SEARCH_COMPLETED';
export const SEARCH_FAILURE = '[CORE] [NAV_SEARCHBAR_COMPONENT] SEARCH_FAILURE';

export class Search implements Action {
    readonly type: string = SEARCH;
    constructor(public payload: string) { }
}
export class SearchCompleted implements Action {
    readonly type: string = SEARCH_COMPLETED;
    constructor(public payload: SearchViewModel) { }
}
export class SearchFailure implements Action {
    readonly type: string = SEARCH_FAILURE;
    constructor(public payload: Error) { }
}
export type Actions =
    | Search
    | SearchCompleted
    | SearchFailure;