import { of } from 'rxjs/observable/of';
import { Router } from '@angular/router';
import { SearchService } from './../services/search/search.service';
import { Store } from '@ngrx/store';
import { AlertModel } from './../../shared/models/dialogs/alert.model';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import * as NavSearchbarComponentActions from './../actions/nav-searchbar-component.actions';
import * as CoreActions from './../actions/core.actions';
import * as fromCore from './../reducers/core-state.reducer';
@Injectable()
export class NavSearchbarComponentEffects {
    @Effect()
    search$ = this.actions$
        .ofType(NavSearchbarComponentActions.SEARCH)
        .map(action => (<NavSearchbarComponentActions.Search>action).payload)
        .switchMap((searchTerms) => {
            return this.searchService.search(searchTerms)
                .map(res => {
                    return new NavSearchbarComponentActions.SearchCompleted(res);
                })
                .catch(
                err => of(new NavSearchbarComponentActions.SearchFailure(err))
                );
        });
    @Effect({ dispatch: false })
    searchCompleted$ = this.actions$
        .ofType(NavSearchbarComponentActions.SEARCH_COMPLETED)
        .map((action) => (<NavSearchbarComponentActions.SearchCompleted>action).payload)
        .do((res) => {
            if (location.pathname !== '/search') {
                this.router.navigate(['/search']);
            }
            console.log('Search Complete');
        });
    @Effect({ dispatch: false })
    searchFailure$ = this.actions$
        .ofType(NavSearchbarComponentActions.SEARCH_FAILURE)
        .map((action) => (<NavSearchbarComponentActions.SearchFailure>action).payload)
        .do((err) => this.coreStore.dispatch(new CoreActions.Errors(
            <AlertModel>{
                title: 'Error Occured!',
                message: err.message || 'Cant Connect to Server Side',
                closeButton: 'Close'
            })));
    constructor(private actions$: Actions,
        private coreStore: Store<fromCore.State>,
        private searchService: SearchService,
        private router: Router) { }
}
