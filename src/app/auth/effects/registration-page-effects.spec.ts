import { registration } from './../../shared/mock-data/registration';
import { UserLoginModel } from './../models/user/user-login/user-login.model';
//#region imports
import { Actions } from '@ngrx/effects';
import { RegistrationPageEffects } from './registration-page.effects';
import { cold } from 'jasmine-marbles';
import { Observable } from 'rxjs/Rx';
import { createUserServiceStub } from './../stubs/services/user-service.stub.spec';
import { UserService } from './../services/user/user.service';
import { StoreModule, combineReducers, Store } from '@ngrx/store';
import { TestBed, async } from '@angular/core/testing';
import * as fromRoot from './../../reducers/app-state.reducer';
import * as fromAuth from './../reducers/auth-state.reducer';
import * as RegistrationPageActions from './../actions/registration-page.actions';
//#endregion


describe('[AUTH] [EFFECT] REGISTRATION-EFFECT', () => {
    //#region properties
    let userService: UserService;
    let actions: Observable<any>;
    let registrationPageEffects: RegistrationPageEffects;
    let userLoginModel: UserLoginModel;
    let expected: Observable<any>;
    //#endregion
    //#region inits items & dispose items
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({
                    ...fromRoot.routerReducers,
                    auth: combineReducers(fromAuth.authStateReducer)
                })
            ]
        });
    }));
    beforeEach(async(() => {
        userLoginModel = registration;
        userService = createUserServiceStub(
            true, true, true,
            undefined,
            undefined);
        userService = jasmine.createSpyObj('userService', ['checkUserLogin',
            'checkEmail', 'checkPhone']);
    }));
    afterEach(() => {
        userService = null;
        actions = null;
        userLoginModel = null;
        registrationPageEffects = null;
    });
    //#endregion
    //#region test suites
    describe('validateUserLogin$', () => {
        it('should dispatch ValidateUserLoginSuccess action if backend say ok', (done) => {
            actions = cold('a', { a: new RegistrationPageActions.ValidateUserLogin(userLoginModel.userLogin) });
            userService = createUserServiceStub(
                false, false, false,
                undefined,
                undefined);
            registrationPageEffects = new RegistrationPageEffects(new Actions(actions), userService);
            expected = cold('b', { b: new RegistrationPageActions.ValidateUserLoginSuccess() });
            expect(registrationPageEffects.validateUserLogin$).toBeObservable(expected);
            expect(userService.checkUserLogin).toHaveBeenCalledWith(userLoginModel.userLogin);
            done();
        });
        it('should dispatch ValidateUserLoginFailure action if backend say no', (done) => {
            actions = cold('a', { a: new RegistrationPageActions.ValidateUserLogin(userLoginModel.userLogin) });
            userService = createUserServiceStub(
                true, true, true,
                undefined,
                undefined);
            registrationPageEffects = new RegistrationPageEffects(new Actions(actions), userService);
            expected = cold('b', { b: new RegistrationPageActions.ValidateUserLoginError(new Error('Userlogin already registered')) });
            expect(registrationPageEffects.validateUserLogin$).toBeObservable(expected);
            expect(userService.checkUserLogin).toHaveBeenCalledWith(userLoginModel.userLogin);
            done();
        });
    });
    describe('validateEmail$', () => {
        it('should dispatch ValidateEmailSuccess action if backend say ok', (done) => {
            actions = cold('a', { a: new RegistrationPageActions.ValidateEmail(userLoginModel.email) });
            userService = createUserServiceStub(
                false, false, false,
                undefined,
                undefined);
            registrationPageEffects = new RegistrationPageEffects(new Actions(actions), userService);
            expected = cold('b', { b: new RegistrationPageActions.ValidateEmailSuccess() });
            expect(registrationPageEffects.validateEmail$).toBeObservable(expected);
            expect(userService.checkEmail).toHaveBeenCalledWith(userLoginModel.email);
            done();
        });
        it('should dispatch ValidateEmailFailure action if backend say no', (done) => {
            actions = cold('a', { a: new RegistrationPageActions.ValidateEmail(userLoginModel.email) });
            userService = createUserServiceStub(
                true, true, true,
                undefined,
                undefined);
            registrationPageEffects = new RegistrationPageEffects(new Actions(actions), userService);
            expected = cold('b', { b: new RegistrationPageActions.ValidateEmailError(new Error('Email already registered')) });
            expect(registrationPageEffects.validateEmail$).toBeObservable(expected);
            expect(userService.checkEmail).toHaveBeenCalledWith(userLoginModel.email);
            done();
        });
    });
    describe('validatePhone$', () => {
        it('should dispatch ValidatePhoneSuccess action if backend say ok', (done) => {
            actions = cold('a', { a: new RegistrationPageActions.ValidatePhone(userLoginModel.phoneNumber.toString()) });
            userService = createUserServiceStub(
                false, false, false,
                undefined,
                undefined);
            registrationPageEffects = new RegistrationPageEffects(new Actions(actions), userService);
            expected = cold('b', { b: new RegistrationPageActions.ValidatePhoneSuccess() });
            expect(registrationPageEffects.validatePhone$).toBeObservable(expected);
            expect(userService.checkPhone).toHaveBeenCalledWith(userLoginModel.phoneNumber.toString());
            done();
        });
        it('should dispatch ValidatePhoneFailure action if backend say no', (done) => {
            actions = cold('a', { a: new RegistrationPageActions.ValidatePhone(userLoginModel.phoneNumber.toString()) });
            userService = createUserServiceStub(
                true, true, true,
                undefined,
                undefined);
            registrationPageEffects = new RegistrationPageEffects(new Actions(actions), userService);
            expected = cold('b', { b: new RegistrationPageActions.ValidatePhoneError(new Error('Phone already registered')) });
            expect(registrationPageEffects.validatePhone$).toBeObservable(expected);
            expect(userService.checkPhone).toHaveBeenCalledWith(userLoginModel.phoneNumber.toString());
            done();
        });
    });
    //#endregion
});
