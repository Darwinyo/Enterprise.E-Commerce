import { registrationResponse } from './../../shared/mock-data/registration-response';
import { registration } from './../../shared/mock-data/registration';
import { loginResponse } from './../../shared/mock-data/login-response';
import { UserRegistrationResponseModel } from './../models/responses/user-registration-response/user-registration-response.model';
import { UserLoginModel } from './../models/user/user-login/user-login.model';
import { AlertModel } from './../../shared/models/dialogs/alert.model';
//#region imports
import { UserLoginResponseModel } from './../models/responses/user-login-response/user-login-response.model';
import { UserLoginViewModel } from './../viewmodels/user-login/user-login.viewmodel';
import { UserService } from './../services/user/user.service';
import { StoreModule, combineReducers, Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { AuthEffects } from './auth.effects';
import { TestBed, async } from '@angular/core/testing';
import { hot, cold } from 'jasmine-marbles';
import * as AuthActions from './../actions/auth.actions';
import * as NavbarActions from './../../core/actions/navbar.actions';
import * as ChatActions from './../../core/actions/chat.actions';
import * as CoreActions from './../../core/actions/core.actions';
import * as fromRoot from './../../reducers/app-state.reducer';
import * as fromAuth from './../reducers/auth-state.reducer';
import * as fromCore from './../../core/reducers/core-state.reducer';
import { createUserServiceStub } from './../stubs/services/user-service.stub.spec';
import { Router } from '@angular/router';
import { RouterStub } from './../../shared/stubs/router.stub';
//#endregion

describe('[AUTH] [EFFECT] AUTH-EFFECT', () => {
    //#region properties
    let authEffect: AuthEffects;
    let actions: Observable<any>;
    let router: Router;
    let coreStore: Store<fromCore.State>;
    let userService: UserService;
    let userLoginViewModel: UserLoginViewModel;
    let userLoginResponseModel: UserLoginResponseModel;
    let expected: Observable<any>;
    let userLoginModel: UserLoginModel;
    let userRegistrationResponseModel: UserRegistrationResponseModel;
    //#endregion
    //#region inits items & dispose items
    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({
                    ...fromRoot.routerReducers,
                    auth: combineReducers(fromAuth.authStateReducer),
                    core: combineReducers(fromCore.coreStateReducer)
                })
            ],
            providers: [
                { provide: Router, useClass: RouterStub }
            ]
        });
    });
    beforeEach(async(() => {
        coreStore = TestBed.get(Store);
        router = TestBed.get(Router);
        spyOn(coreStore, 'dispatch').and.callThrough();
        spyOn(router, 'navigate').and.callThrough();
        userLoginViewModel = <UserLoginViewModel>{
            userLogin: 'test',
            password: 'p@ssw0rd',
            rememberme: false
        };
        userLoginResponseModel = loginResponse;
        userRegistrationResponseModel = registrationResponse;
        userLoginModel = registration;
        userService = createUserServiceStub(
            true, true, true,
            userLoginResponseModel,
            userRegistrationResponseModel);
    }));
    afterEach(() => {
        authEffect = null;
        actions = null;
        router = null;
        coreStore = null;
        userService = null;
        userLoginViewModel = null;
        userLoginModel = null;
        userLoginResponseModel = null;
        userRegistrationResponseModel = null;
        expected = null;
    });
    //#endregion
    //#region test suites
    describe('login$', () => {
        it('should call user service and should dispatch login success action', (done) => {
            actions = cold('a', { a: new AuthActions.Login(userLoginViewModel) });
            authEffect = new AuthEffects(new Actions(actions), userService, router, coreStore);
            expected = cold('c', { c: new AuthActions.LoginSuccess(userLoginResponseModel) });
            expect(authEffect.login$).toBeObservable(expected);
            expect(userService.userLogin).toHaveBeenCalledWith(userLoginViewModel);
            done();
        });
        it('should call user service and should dispatch login failure action', (done) => {
            actions = cold('a', { a: new AuthActions.Login(userLoginViewModel) });
            userLoginResponseModel.isLogged = false;
            userService = createUserServiceStub(
                true, true, true,
                userLoginResponseModel,
                undefined);
            authEffect = new AuthEffects(new Actions(actions), userService, router, coreStore);
            expected = cold('c', { c: new AuthActions.LoginFailure(new Error('Wrong Pass or UserName')) });
            expect(authEffect.login$).toBeObservable(expected);
            expect(userService.userLogin).toHaveBeenCalledWith(userLoginViewModel);
            done();
        });
        it('should call user service and should dispatch login failure action when backend error', (done) => {
            actions = cold('a', { a: new AuthActions.Login(userLoginViewModel) });
            userService = createUserServiceStub(
                true, true, true,
                new Error('Error occurred!'),
                undefined);
            authEffect = new AuthEffects(new Actions(actions), userService, router, coreStore);
            expected = cold('c', { c: new AuthActions.LoginFailure(new Error('Error occurred!')) });
            expect(authEffect.login$).toBeObservable(expected);
            expect(userService.userLogin).toHaveBeenCalledWith(userLoginViewModel);
            done();
        });
    });
    describe('loginSuccess$', () => {
        it('should dispatch Alert, NavLogged & ConnectingChatHub actions and should navigate to homepage', (done) => {
            actions = cold('a', { a: new AuthActions.LoginSuccess(userLoginResponseModel) });
            authEffect = new AuthEffects(new Actions(actions), userService, router, coreStore);
            expected = cold('b', {
                b: new AuthActions.LoginSuccess(userLoginResponseModel)
            });
            expect(authEffect.loginSuccess$).toBeObservable(expected);
            expect(coreStore.dispatch).toHaveBeenCalledWith(
                new CoreActions.Alert(
                    <AlertModel>{
                        title: 'Notif',
                        message: 'youre logged in',
                        closeButton: 'Close'
                    }));
            expect(coreStore.dispatch).toHaveBeenCalledWith(new NavbarActions.NavLogged());
            expect(coreStore.dispatch).toHaveBeenCalledWith(new ChatActions.ConnectingChatHub());
            expect(router.navigate).toHaveBeenCalledWith(['/home']);
            done();
        });
    });
    describe('loginRedirect$', () => {
        it('should redirect user to login page', (done) => {
            actions = cold('a', { a: new AuthActions.LoginRedirect() });
            authEffect = new AuthEffects(new Actions(actions), userService, router, coreStore);
            expected = cold('b', {
                b: new AuthActions.LoginRedirect()
            });
            expect(authEffect.loginRedirect$).toBeObservable(expected);
            expect(router.navigate).toHaveBeenCalledWith(['/login']);
            done();
        });
    });
    describe('logout$', () => {
        it('should dispatch Alert actions', (done) => {
            actions = cold('a', { a: new AuthActions.Logout() });
            authEffect = new AuthEffects(new Actions(actions), userService, router, coreStore);
            expected = cold('b', {
                b: new AuthActions.Logout()
            });
            expect(authEffect.logout$).toBeObservable(expected);
            expect(coreStore.dispatch).toHaveBeenCalledWith(
                new CoreActions.Alert(<AlertModel>{
                    title: 'Notif',
                    message: 'youre logged out',
                    closeButton: 'Close'
                }));
            done();
        });
    });
    describe('loginFailure$', () => {
        it('should dispatch Error actions', (done) => {
            actions = cold('a', { a: new AuthActions.LoginFailure(new Error('Test Throw Error')) });
            authEffect = new AuthEffects(new Actions(actions), userService, router, coreStore);
            expected = cold('b', {
                b: new AuthActions.LoginFailure(new Error('Test Throw Error'))
            });
            expect(authEffect.loginFailure$).toBeObservable(expected);
            expect(coreStore.dispatch).toHaveBeenCalledWith(
                new CoreActions.Errors(<AlertModel>{
                    title: 'Error Occured!',
                    message: 'Test Throw Error',
                    closeButton: 'Close'
                }));
            done();
        });
    });
    describe('registration$', () => {
        it('should call user service and should dispatch RegistrationSuccess action', (done) => {
            actions = cold('a', { a: new AuthActions.Registration(userLoginModel) });
            authEffect = new AuthEffects(new Actions(actions), userService, router, coreStore);
            expected = cold('b', { b: new AuthActions.RegistrationSuccess() });
            expect(authEffect.registration$).toBeObservable(expected);
            expect(userService.userRegistration).toHaveBeenCalledWith(userLoginModel);
            done();
        });
        it('should call user service and should dispatch RegistrationFailure action', (done) => {
            actions = cold('a', { a: new AuthActions.Registration(userLoginModel) });
            userRegistrationResponseModel.result = true;
            userService = createUserServiceStub(
                true, true, true,
                undefined,
                userRegistrationResponseModel);
            authEffect = new AuthEffects(new Actions(actions), userService, router, coreStore);
            expected = cold('b', { b: new AuthActions.RegistrationFailure(new Error('form is not valid')) });
            expect(authEffect.registration$).toBeObservable(expected);
            expect(userService.userRegistration).toHaveBeenCalledWith(userLoginModel);
            done();
        });
        it('should call user service and should dispatch RegistrationFailure action when backend error', (done) => {
            actions = cold('a', { a: new AuthActions.Registration(userLoginModel) });
            userService = createUserServiceStub(
                true, true, true,
                undefined,
                new Error('Error occurred!'));
            authEffect = new AuthEffects(new Actions(actions), userService, router, coreStore);
            expected = cold('b', { b: new AuthActions.RegistrationFailure(new Error('Error occurred!')) });
            expect(authEffect.registration$).toBeObservable(expected);
            expect(userService.userRegistration).toHaveBeenCalledWith(userLoginModel);
            done();
        });
    });
    describe('registrationSuccess$', () => {
        it('should dispatch LoginRedirect action', (done) => {
            actions = cold('a', { a: new AuthActions.RegistrationSuccess() });
            authEffect = new AuthEffects(new Actions(actions), userService, router, coreStore);
            expected = cold('b', { b: new AuthActions.RegistrationSuccess() });
            expect(authEffect.registrationSuccess$).toBeObservable(expected);
            expect(coreStore.dispatch).toHaveBeenCalledWith(new AuthActions.LoginRedirect());
            expect(coreStore.dispatch).toHaveBeenCalledWith(new CoreActions.Alert(<AlertModel>{
                title: 'Notif',
                message: 'youre registered',
                closeButton: 'Close'
            }));
            done();
        });
    });
    describe('registrationFailure$', () => {
        it('should dispatch alert actions', (done) => {
            actions = cold('a', { a: new AuthActions.RegistrationFailure(new Error('Test Throw Error')) });
            authEffect = new AuthEffects(new Actions(actions), userService, router, coreStore);
            expected = cold('b', {
                b: new AuthActions.RegistrationFailure(new Error('Test Throw Error'))
            });
            expect(authEffect.registrationFailure$).toBeObservable(expected);
            expect(coreStore.dispatch).toHaveBeenCalledWith(
                new CoreActions.Errors(<AlertModel>{
                    title: 'Error Occured!',
                    message: 'Test Throw Error',
                    closeButton: 'Close'
                }));
            done();
        });
    });
    //#endregion
});
