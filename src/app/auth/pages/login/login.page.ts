import { ReplaySubject } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { NgForm } from '@angular/forms';
import { UserLoginViewModel } from './../../viewmodels/user-login/user-login.viewmodel';
import { Component, OnInit, ViewContainerRef, OnDestroy } from '@angular/core';
import { TdLoadingService } from '@covalent/core';
import * as fromAuth from './../../reducers/auth-state.reducer';
import * as AuthActions from './../../actions/auth.actions';
import * as LoginPageAction from './../../actions/login-page.actions';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-auth-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
// tslint:disable-next-line:component-class-suffix
export class LoginPage implements OnInit, OnDestroy {
  userLoginViewModel: UserLoginViewModel;
  hiddenpass$: Observable<boolean>;
  pending$: Observable<boolean>;
  unsubscribe$: ReplaySubject<boolean>;
  typeInput: string;
  constructor(
    private authStore: Store<fromAuth.State>) {
    this.userLoginViewModel = <UserLoginViewModel>{};
    this.hiddenpass$ = this.authStore.select(fromAuth.getLoginPageisPasswordShow);
    this.pending$ = this.authStore.select(fromAuth.getLoginPagePending);
    this.unsubscribe$ = new ReplaySubject(1);
  }

  ngOnInit() {
    this.hiddenpass$
      .filter((message) => message !== null)
      .takeUntil(this.unsubscribe$)
      .subscribe(
      (res) => !res ? this.typeInput = 'password' : this.typeInput = 'text'
      );
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }
  onNavLoginForm_Submit() {
    this.authStore.dispatch(new AuthActions.Login(this.userLoginViewModel));
  }
  onTogglePassword_Click() {
    this.authStore.dispatch(new LoginPageAction.TogglePassword());
  }
  passwordType(): string {
    return this.typeInput;
  }
}
