import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { MenuModel } from './../../../shared/models/menu/menu.model';
import { CartViewmodel } from './../../viewmodels/cart/cart.viewmodel';
import { Observable, ReplaySubject } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { UserLoginResponseModel } from './../../../auth/models/responses/user-login-response/user-login-response.model';
import { UserService } from './../../../auth/services/user/user.service';
import { UserLoginViewModel } from './../../../auth/viewmodels/user-login/user-login.viewmodel';
import { Router } from '@angular/router';
import { ProductReviewService } from './../../../product/services/product-review/product-review.service';
import { Component, OnInit, Output, EventEmitter, ViewContainerRef, OnDestroy } from '@angular/core';
import * as fromCore from './../../reducers/core-state.reducer';
import * as fromAuth from './../../../auth/reducers/auth-state.reducer';
import * as NavbarActions from './../../actions/navbar.actions';
import * as AuthActions from './../../../auth/actions/auth.actions';
import * as LoginNavComponentActions from './../../../auth/actions/login-nav-component.actions';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-core-navbar',
  templateUrl: './navbar.container.html',
  styleUrls: ['./navbar.container.scss']
})
// tslint:disable-next-line:component-class-suffix
export class NavbarContainer implements OnInit, OnDestroy {
  @Output() openSidebar: EventEmitter<any>;
  logged$: Observable<boolean>;
  userLoginResponseModel: UserLoginResponseModel;
  toggleNotif$: Observable<boolean>;
  toggleCart$: Observable<boolean>;
  toggleUser$: Observable<boolean>;
  toggleLogin$: Observable<boolean>;
  unsubscribe$: ReplaySubject<boolean>;
  //#region LoginNav observables
  loginNavComponentIsPasswordShow$: Observable<boolean>;
  loginNavComponentPending$: Observable<boolean>;
  loginNavComponentError$: Observable<string | null>;
  //#endregion
  cartList: CartViewmodel[];
  userMenuModel: MenuModel[];
  messageMenuModel: MenuModel[];
  constructor(
    private _iconRegistry: MatIconRegistry,
    private _domSanitizer: DomSanitizer,
    private router: Router,
    private productReviewService: ProductReviewService,
    private userService: UserService,
    private coreStore: Store<fromCore.State>
  ) {
    this.cartList = [];
    this.messageMenuModel = [];
    this.userMenuModel = [];
    this.openSidebar = new EventEmitter<any>();
    this._iconRegistry.addSvgIconInNamespace('assets', 'enterprise',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/enterprise.png'));
    this.logged$ = this.coreStore.select(fromCore.getLogged);
    this.toggleCart$ = this.coreStore.select(fromCore.getCartMenu);
    this.toggleLogin$ = this.coreStore.select(fromCore.getLoginMenu);
    this.toggleNotif$ = this.coreStore.select(fromCore.getNotifMenu);
    this.toggleUser$ = this.coreStore.select(fromCore.getUserMenu);
    this.unsubscribe$ = new ReplaySubject(1);
    //#region LoginNav Selectors
    this.loginNavComponentIsPasswordShow$ = this.coreStore.select(fromAuth.getLoginNavComponentIsPasswordShow);
    this.loginNavComponentPending$ = this.coreStore.select(fromAuth.getLoginNavComponentPending);
    //#endregion
  }

  ngOnInit() {
    //#region Mock Data
    this.userMenuModel = [
      <MenuModel>{
        menuTitle: 'Purchase History',
        menuHref: '/purchase-history',
        menuIcon: 'history'
      },
      <MenuModel>{
        menuTitle: 'Wishlist',
        menuHref: '/wishlist',
        menuIcon: 'shopping_basket'
      },
      <MenuModel>{
        menuTitle: 'Favorite Vendors',
        menuHref: '/favorite-vendors',
        menuIcon: 'store'
      },
      <MenuModel>{
        menuTitle: 'Settings',
        menuHref: '/settings',
        menuIcon: 'settings'
      },
      <MenuModel>{
        menuTitle: 'Log Out',
        menuHref: '/log-out',
        menuIcon: 'exit_to_app'
      }];
    this.messageMenuModel = [
      <MenuModel>{
        menuTitle: 'Message',
        menuHref: 'message',
        menuIcon: 'email',
        menuNotification: 3
      }, <MenuModel>{
        menuTitle: 'Product Reviews',
        menuHref: 'product-reviews',
        menuIcon: 'comment',
        menuNotification: 3
      }, <MenuModel>{
        menuTitle: 'Customer Service',
        menuHref: 'customer-service',
        menuIcon: 'room_service'
      }];
    for (let i = 0; i < 3; i++) {
      this.cartList.push(<CartViewmodel>{
        productName: 'Xiaomi Mi Max 2 Gold RAM 4/128 GB - Garansi 1 Tahun',
        productPrice: 3575000,
        productQuantity: 1,
        productFrontImage: 'assets/img/test/testIconCart.jpg'
      });
    }
    //#endregion
    //#region Errors Handlers

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
  toggleDropNotif() {
    this.coreStore.dispatch(new NavbarActions.ToggleNotif());
  }
  toggleDropCart() {
    this.coreStore.dispatch(new NavbarActions.ToggleCart());
  }
  toggleDropUser() {
    this.coreStore.dispatch(new NavbarActions.ToggleUser());
  }
  toggleDropLogin() {
    this.coreStore.dispatch(new NavbarActions.ToggleLogin());
  }
  addReview(productId: string) {
    this.productReviewService.addReview(productId).subscribe(
      () => console.log('call addReview'),
      (err) => console.log(err),
      () => this.router.navigate(['product-details', productId])
    );
  }

  emitOpenSideBarEvent() {
    this.openSidebar.emit();
  }
}
