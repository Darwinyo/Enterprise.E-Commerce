import { Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as NavbarActions from './../actions/navbar.actions';
import * as fromCore from './../reducers/core-state.reducer';
import 'rxjs/add/operator/do';
@Injectable()
export class NavbarEffects {
    @Effect({ dispatch: false })
    logged$ = this.actions$
        .ofType(NavbarActions.NAV_LOGGED)
        .do(() => {
            console.log('navbar logged');
            this.coreStore.dispatch(new NavbarActions.ToggleLogin());
        });
    @Effect({ dispatch: false })
    toogleLogin$ = this.actions$
        .ofType(NavbarActions.TOGGLE_LOGIN)
        .do(() => console.log('Nav Login Toggled'));
    @Effect()
    search$ = this.actions$
        .ofType(NavbarActions.SEARCH)
        .do(() => console.log('Nav Login Toggled'));
    @Effect({ dispatch: false })
    searchCompleted$ = this.actions$
        .ofType(NavbarActions.SEARCH_COMPLETED)
        .do(() => console.log('Nav Login Toggled'));
    @Effect({ dispatch: false })
    searchFailure$ = this.actions$
        .ofType(NavbarActions.SEARCH_FAILURE)
        .do(() => console.log('Nav Login Toggled'));

    constructor(private actions$: Actions, private coreStore: Store<fromCore.State>) { }
}
