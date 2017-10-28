import { AlertModel } from './../../shared/models/dialogs/alert.model';
//#region imports
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { UserService } from './../services/user/user.service';
import { Injectable, ViewContainerRef, OnDestroy } from '@angular/core';
import * as AuthActions from './../actions/auth.actions';
import * as NavbarActions from './../../core/actions/navbar.actions';
import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/map';
import * as fromCore from './../../core/reducers/core-state.reducer';
import * as ChatActions from './../../core/actions/chat.actions';
import * as CoreActions from './../../core/actions/core.actions';
//#endregion

@Injectable()
export class AuthEffects {
    //#region logins effects
    @Effect()
    login$ = this.actions$
        .ofType(AuthActions.LOG_IN)
        .map((action: AuthActions.Login) => action.payload)
        .exhaustMap(userLogin =>
            this.userService.userLogin(userLogin)
                .map(response => {
                    if (response.isLogged === true) {
                        return new AuthActions.LoginSuccess(response);
                    } else {
                        throw new Error('Wrong Pass or UserName');
                    }
                })
                .catch((err: Error) => of(new AuthActions.LoginFailure(err))));
    @Effect({ dispatch: false })
    loginRedirect$ = this.actions$
        .ofType(AuthActions.LOG_IN_REDIRECT)
        .do(() => this.router.navigate(['/login']));
    @Effect({ dispatch: false })
    loginSuccess$ = this.actions$
        .ofType(AuthActions.LOG_IN_SUCCESS)
        .do(() => {
            this.coreStore.dispatch(
                new CoreActions.Alert(<AlertModel>{
                    title: 'Notif',
                    message: 'youre logged in',
                    closeButton: 'Close'
                })
            );
            this.coreStore.dispatch(new NavbarActions.NavLogged());
            this.coreStore.dispatch(new ChatActions.ConnectingChatHub());
            this.router.navigate(['/home']);
        });
    @Effect({ dispatch: false })
    loginFailure$ = this.actions$
        .ofType(AuthActions.LOG_IN_FAILURE)
        .do((err) => this.coreStore.dispatch(
            new CoreActions.Errors(<AlertModel>{
                title: 'Error Occured!',
                message: (<AuthActions.LoginFailure>err).payload.message || 'Cant Connect to Server Side',
                closeButton: 'Close'
            })
        ));
    @Effect({ dispatch: false })
    logout$ = this.actions$
        .ofType(AuthActions.LOG_OUT)
        .do(() => this.coreStore.dispatch(
            new CoreActions.Alert(<AlertModel>{
                title: 'Notif',
                message: 'youre logged out',
                closeButton: 'Close'
            })
        ));
    @Effect()
    registration$ = this.actions$
        .ofType(AuthActions.REGISTRATION)
        .map((action: AuthActions.Registration) => action.payload)
        .exhaustMap(userLogin =>
            this.userService.userRegistration(userLogin)
                .map(response => {
                    if (!response.result) {
                        return new AuthActions.RegistrationSuccess();
                    } else {
                        throw new Error('form is not valid');
                    }
                })
                .catch((err: Error) => of(new AuthActions.RegistrationFailure(err))));
    @Effect({ dispatch: false })
    registrationSuccess$ = this.actions$
        .ofType(AuthActions.REGISTRATION_SUCCESS)
        .do(() => {
            this.coreStore.dispatch(
                new CoreActions.Alert(<AlertModel>{
                    title: 'Notif',
                    message: 'youre registered',
                    closeButton: 'Close'
                }));
            this.coreStore.dispatch(new AuthActions.LoginRedirect());
        });
    @Effect({ dispatch: false })
    registrationFailure$ = this.actions$
        .ofType(AuthActions.REGISTRATION_FAILURE)
        .do((err) => this.coreStore.dispatch(
            new CoreActions.Errors(<AlertModel>{
                title: 'Error Occured!',
                message: (<AuthActions.RegistrationFailure>err).payload.message || 'Cant Connect to Server Side',
                closeButton: 'Close'
            })));
    //#endregion

    constructor(
        private actions$: Actions,
        private userService: UserService,
        private router: Router,
        private coreStore: Store<fromCore.State>
    ) {
    }
}
