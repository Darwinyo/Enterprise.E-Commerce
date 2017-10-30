import { Router } from '@angular/router';
import { AlertModel } from './../../shared/models/dialogs/alert.model';
import { of } from 'rxjs/observable/of';
import { SearchService } from './../services/search/search.service';
import { Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as NavbarActions from './../actions/navbar-container.actions';
import * as CoreActions from './../actions/core.actions';
import * as fromCore from './../reducers/core-state.reducer';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
@Injectable()
export class NavbarContainerEffects {
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

    constructor(private actions$: Actions,
        private coreStore: Store<fromCore.State>) { }
}
