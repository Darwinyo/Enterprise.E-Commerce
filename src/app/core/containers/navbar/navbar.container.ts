import { notifications } from './../../../shared/mock-data/notifications';
import { NotificationModel } from './../../models/notification/notification.model';
import { UserLoginViewModel } from './../../../auth/viewmodels/user-login/user-login.viewmodel';
import { cartList } from './../../../shared/mock-data/cart-list';
import { messageMenu } from './../../../shared/mock-data/message-menu';
import { userMenu } from './../../../shared/mock-data/user-menu';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { MenuModel } from './../../../shared/models/menu/menu.model';
import { CartViewModel } from './../../viewmodels/cart/cart.viewmodel';
import { Observable, ReplaySubject } from 'rxjs/Rx';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserMenuViewModel } from '../../viewmodels/user-menu/user-menu.viewmodel';
import { userMenuViewModel } from '../../../shared/mock-data/user-menu-view-model';
import * as fromCore from './../../reducers/core-state.reducer';
import * as fromAuth from './../../../auth/reducers/auth-state.reducer';
import * as NavbarActions from './../../actions/navbar.actions';
import * as AuthActions from './../../../auth/actions/auth.actions';
import * as LoginNavComponentActions from './../../../auth/actions/login-nav-component.actions';

@Component({
  selector: 'app-core-navbar',
  templateUrl: './navbar.container.html',
  styleUrls: ['./navbar.container.scss']
})
// tslint:disable-next-line:component-class-suffix
export class NavbarContainer implements OnInit, OnDestroy {
  logged$: Observable<boolean>;
  toggleLogin$: Observable<boolean>;
  unsubscribe$: ReplaySubject<boolean>;
  //#region LoginNav observables
  loginNavComponentIsPasswordShow$: Observable<boolean>;
  loginNavComponentPending$: Observable<boolean>;
  //#endregion
  cartList: CartViewModel[];
  userMenuModel: MenuModel[];
  messageMenuModel: MenuModel[];
  userMenuDetail: UserMenuViewModel;
  notification: NotificationModel[];
  constructor(
    private router: Router,
    // private productReviewService: ProductReviewService,
    private coreStore: Store<fromCore.State>
  ) {
    this.cartList = [];
    this.messageMenuModel = [];
    this.userMenuModel = [];
    this.notification = [];
    this.logged$ = this.coreStore.select(fromCore.getLogged);
    this.toggleLogin$ = this.coreStore.select(fromCore.getLoginMenu);
    this.unsubscribe$ = new ReplaySubject(1);
    //#region LoginNav Selectors
    this.loginNavComponentIsPasswordShow$ = this.coreStore.select(fromAuth.getLoginNavComponentIsPasswordShow);
    this.loginNavComponentPending$ = this.coreStore.select(fromAuth.getLoginNavComponentPending);
    //#endregion
  }

  ngOnInit() {
    //#region Mock Data
    this.userMenuModel = userMenu;
    this.messageMenuModel = messageMenu;
    this.cartList = cartList;
    this.userMenuDetail = userMenuViewModel;
    this.notification = notifications;
    //#endregion
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }
  //#region LoginNav Events
  onTogglePassword() {
    this.coreStore.dispatch(new LoginNavComponentActions.TogglePassword());
  }
  onLoginUser(userLoginViewModel: UserLoginViewModel) {
    this.coreStore.dispatch(new AuthActions.Login(userLoginViewModel));
  }
  //#endregion
  onNavbarLoginBtn_Click() {
    this.coreStore.dispatch(new NavbarActions.ToggleLogin());
  }
  onReviewEvent(productId: string) {
    // this.productReviewService.addReview(productId).subscribe(
    //   () => console.log('call addReview'),
    //   (err) => console.log(err),
    //   () => this.router.navigate(['product-details', productId])
    // );
  }
  onNavigateEvent(url: string) {
    this.router.navigate([url]);
  }
  onSearchEvent(searchTerms: string) {
    
  }
}
