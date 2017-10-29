import { NotificationComponent } from './../../components/notification/notification.component';
import { loginResponse } from './../../../shared/mock-data/login-response';
import { UserLoginResponseModel } from './../../../auth/models/responses/user-login-response/user-login-response.model';
import { UserMenuComponent } from './../../components/user-menu/user-menu.component';
import { CartComponent } from './../../components/cart/cart.component';
import { MessageMenuComponent } from './../../components/message-menu/message-menu.component';
import { FormsModule } from '@angular/forms';
import { LoginNavComponent } from './../../../auth/components/login-nav/login-nav.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CovalentSearchModule, CovalentLoadingModule, CovalentNotificationsModule, CovalentMenuModule } from '@covalent/core';
import { NavSearchbarComponent } from './../../components/nav-searchbar/nav-searchbar.component';
import { StoreModule, combineReducers, Store } from '@ngrx/store';
import { RouterStub } from './../../../shared/stubs/router.stub';
import { Router } from '@angular/router';
import { MatIconModule, MatMenuModule } from '@angular/material';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Component } from '@angular/core';

import { NavbarContainer } from './navbar.container';
import * as fromCore from './../../reducers/core-state.reducer';
import * as fromAuth from './../../../auth/reducers/auth-state.reducer';
import * as fromRoot from './../../../reducers/app-state.reducer';
import * as AuthActions from './../../../auth/actions/auth.actions';
import { of } from 'rxjs/observable/of';
fdescribe('[CORE] [CONTAINER] NAVBARCONTAINER', () => {
  let component: NavbarContainer;
  let componentEl: HTMLElement;
  let fixture: ComponentFixture<NavbarContainer>;
  let authStore: Store<fromAuth.AuthState>;
  let userLoginResponse: UserLoginResponseModel;
  let loginNavComponent: LoginNavComponent;
  let navSearchbarComponent: NavSearchbarComponent;
  let messageMenuComponent: MessageMenuComponent;
  let cartComponent: CartComponent;
  let notificationComponent: NotificationComponent;
  let userMenuComponent: UserMenuComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginNavComponent,
        NavbarContainer,
        NavSearchbarComponent,
        MessageMenuComponent,
        CartComponent,
        NotificationComponent,
        UserMenuComponent
      ],
      imports: [
        FormsModule,
        NoopAnimationsModule,
        MatIconModule,
        MatMenuModule,
        StoreModule.forRoot({
          ...fromRoot.routerReducers,
          auth: combineReducers(fromAuth.authStateReducer),
          core: combineReducers(fromCore.coreStateReducer)
        }),
        CovalentMenuModule,
        CovalentNotificationsModule,
        CovalentSearchModule,
        CovalentLoadingModule
      ],
      providers: [
        { provide: Router, useClass: RouterStub }
      ]
    });
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NavbarContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));
  beforeEach(async(() => {
    componentEl = fixture.debugElement.nativeElement;
    authStore = TestBed.get(Store);
    loginNavComponent = TestBed.get(LoginNavComponent);
    navSearchbarComponent = TestBed.get(NavSearchbarComponent);
    messageMenuComponent = TestBed.get(MessageMenuComponent);
    cartComponent = TestBed.get(CartComponent);
    notificationComponent = TestBed.get(NotificationComponent);
    userMenuComponent = TestBed.get(UserMenuComponent);
    userLoginResponse = loginResponse;
  }));
  describe('UI Tests', () => {
    it('should display login & registration btn when user is not logged', async(() => {
      fixture.whenStable().then(() => {
        expect(componentEl.innerHTML).toContain('Login');
        expect(componentEl.innerHTML).toContain('Register');
      });
    }));
    it('should not display Other menu btn when user is not logged', async(() => {
      fixture.whenStable().then(() => {
        expect(componentEl.innerHTML).not.toContain('shopping_cart');
        expect(componentEl.innerHTML).not.toContain('notifications');
        expect(componentEl.innerHTML).not.toContain('messages');
        expect(componentEl.innerHTML).not.toContain('person');
      });
    }));
    it('should not display login & registration btn when user is not logged', async(() => {
      component.logged$ = of(true);
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(componentEl.innerHTML).not.toContain('Login');
        expect(componentEl.innerHTML).not.toContain('Register');
      });
    }));
    it('should display Other menu btn when user is not logged', async(() => {
      component.logged$ = of(true);
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(componentEl.innerHTML).toContain('shopping_cart');
        expect(componentEl.innerHTML).toContain('notifications');
        expect(componentEl.innerHTML).toContain('messages');
        expect(componentEl.innerHTML).toContain('person');
      });
    }));
  });
  describe('Functionality Tests', () => {
    beforeEach(() => {
      spyOn
    })
    it('should ')
  })
});
