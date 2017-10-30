import { Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as fromAuth from './../reducers/auth-state.reducer';
import * as LoginNavComponentActions from './../actions/login-nav-component.actions';
import 'rxjs/add/operator/do';
@Injectable()
export class LoginNavComponentEffects {
    @Effect({ dispatch: false })
    togglePassword$ = this.actions$
        .ofType(LoginNavComponentActions.TOGGLE_PASSWORD)
        .do(() => console.log('LoginNav Toggle Password'));

    constructor(
        private actions$: Actions,
        private coreStore: Store<fromAuth.State>
    ) { }
}
