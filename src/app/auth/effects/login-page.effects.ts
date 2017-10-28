import { Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as fromAuth from './../reducers/auth-state.reducer';
import * as LoginPageActions from './../actions/login-page.actions';
import 'rxjs/add/operator/do';
@Injectable()
export class LoginPageEffects {
    @Effect({ dispatch: false })
    togglePassword$ = this.actions$
        .ofType(LoginPageActions.TOGGLE_PASSWORD)
        .do(() => console.log('LoginPage Toggle Password'));

    constructor(
        private actions$: Actions,
        private coreStore: Store<fromAuth.State>
    ) { }
}
