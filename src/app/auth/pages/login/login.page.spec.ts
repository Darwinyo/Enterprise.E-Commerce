import { login } from './../../../shared/mock-data/login';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Rx';
//#region imports
import { hot } from 'jasmine-marbles';
import { UserLoginViewModel } from './../../viewmodels/user-login/user-login.viewmodel';
import { MatCheckboxModule, MatButtonModule, MatInputModule } from '@angular/material';
import { CovalentLoadingModule, CovalentDialogsModule } from '@covalent/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Store, StoreModule, combineReducers } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LoginPage } from './login.page';
import * as fromRoot from './../../../reducers/app-state.reducer';
import * as fromAuth from './../../reducers/auth-state.reducer';
import * as AuthActions from './../../actions/auth.actions';
import * as LoginPageActions from './../../actions/login-page.actions';
//#endregion

describe('[AUTH] [PAGE] LOGIN-PAGE', () => {
    //#region properties
    let component: LoginPage;
    let fixture: ComponentFixture<LoginPage>;
    let emailtxtbox: HTMLInputElement;
    let passtxtbox: HTMLInputElement;
    let remembermechkbox: HTMLInputElement;
    let submitbtn: HTMLButtonElement;
    let iconPassword: HTMLElement;
    let authStore: Store<fromAuth.State>;
    let userLoginViewModel: UserLoginViewModel;
    //#endregion
    //#region init data and dispose
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LoginPage],
            imports: [
                FormsModule,
                BrowserAnimationsModule,
                CovalentLoadingModule,
                CovalentDialogsModule,
                MatCheckboxModule,
                MatButtonModule,
                MatInputModule,
                StoreModule.forRoot({
                    ...fromRoot.routerReducers,
                    auth: combineReducers(fromAuth.authStateReducer)
                })
            ]
        });
    }));

    beforeEach(async(() => {
        fixture = TestBed.createComponent(LoginPage);
        component = fixture.componentInstance;
        authStore = TestBed.get(Store);
        fixture.detectChanges();
    }));
    beforeEach(async(() => {
        emailtxtbox = fixture.debugElement.query(By.css('#inputEmail')).nativeElement;
        passtxtbox = fixture.debugElement.query(By.css('#inputPassword')).nativeElement;
        remembermechkbox = fixture.debugElement.query(By.css('#rememberme_chkbox label')).nativeElement;
        submitbtn = fixture.debugElement.query(By.css('#login_btn')).nativeElement;
        iconPassword = fixture.debugElement.query(By.css('#icon_password')).nativeElement;
        userLoginViewModel = login;
    }));
    afterEach(() => {
        component = null;
        fixture = null;
        emailtxtbox = null;
        passtxtbox = null;
        remembermechkbox = null;
        submitbtn = null;
        authStore = null;
        userLoginViewModel = null;
    });
    //#endregion
    it('should be type text inputPassword when hidden pass is true', async(() => {
        fixture.whenStable().then(
            () => {
                authStore.dispatch(new LoginPageActions.TogglePassword());
                fixture.detectChanges();
                expect(passtxtbox.type).toBe('text');
            }
        );
    }));
    it('should be type password inputPassword when hidden pass is false', async(() => {
        fixture.whenStable().then(
            () => {
                fixture.detectChanges();
                expect(passtxtbox.type).toBe('password');
            }
        );
    }));
    it('should be dispatch TogglePassword Action when icon-password clicked', () => {
        spyOn(authStore, 'dispatch').and.callThrough();
        iconPassword.click();
        expect(authStore.dispatch).toHaveBeenCalledWith(new LoginPageActions.TogglePassword());
    });
    it('should be dispatch Login Actions with correct data when loginbtn clicked', async(() => {
        spyOn(authStore, 'dispatch').and.callThrough();
        spyOn(component, 'onNavLoginForm_Submit').and.callThrough();
        fixture.whenStable().then(() => {
            emailtxtbox.value = userLoginViewModel.userLogin;
            passtxtbox.value = userLoginViewModel.password;
            remembermechkbox.checked = userLoginViewModel.rememberme;
            emailtxtbox.dispatchEvent(new Event('input'));
            passtxtbox.dispatchEvent(new Event('input'));
            remembermechkbox.click();
            submitbtn.click();
            expect(component.onNavLoginForm_Submit).toHaveBeenCalled();
            expect(authStore.dispatch).toHaveBeenCalledWith(new AuthActions.Login(userLoginViewModel));
        });
    }));
});
