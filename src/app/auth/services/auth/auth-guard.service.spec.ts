import { loginResponse } from './../../../shared/mock-data/login-response';
//#region imports
import { UserLoginResponseModel } from './../../models/responses/user-login-response/user-login-response.model';
import { Store, StoreModule, combineReducers } from '@ngrx/store';
import { cold } from 'jasmine-marbles';
import * as fromRoot from './../../../reducers/app-state.reducer';
import * as fromAuth from './../../reducers/auth-state.reducer';
import { TestBed, async, inject } from '@angular/core/testing';
import { AuthGuardService } from './auth-guard.service';
import * as AuthActions from './../../actions/auth.actions';
//#endregion

describe('[AUTH] [SERVICE] AUTH-GUARD-SERVICE :', () => {
  //#region properties
  let authGuardService: AuthGuardService;
  let authStore: Store<fromAuth.State>;
  let userLoginResponseModel: UserLoginResponseModel;
  //#endregion
  //#region inits items and dispose
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.routerReducers,
          auth: combineReducers(fromAuth.authStateReducer)
        })
      ],
      providers: [
        AuthGuardService
      ]
    });
  }));
  beforeEach(async(() => {
    authGuardService = TestBed.get(AuthGuardService);
    authStore = TestBed.get(Store);
    spyOn(authStore, 'dispatch').and.callThrough();
  }));
  beforeEach(() => {
    userLoginResponseModel = loginResponse;
  });
  afterEach(() => {
    authGuardService = null;
    authStore = null;
    userLoginResponseModel = null;
  });
  //#endregion
  it('should return false and should dispatch LoginRedirect action when user is not logged', (done) => {
    const expected = cold('(a|)', { a: false });
    expect(authGuardService.canActivate()).toBeObservable(expected);
    expect(authStore.dispatch).toHaveBeenCalledWith(new AuthActions.LoginRedirect());
    done();
  });
  it('should return true when user is logged', (done) => {
    userLoginResponseModel.isLogged = true;
    const expected = cold('(a|)', { a: true });
    authStore.dispatch(new AuthActions.LoginSuccess(userLoginResponseModel));
    expect(authGuardService.canActivate()).toBeObservable(expected);
    done();
  });
});
