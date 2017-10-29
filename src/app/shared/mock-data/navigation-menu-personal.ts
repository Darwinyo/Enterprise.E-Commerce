import { MenuModel } from './../models/menu/menu.model';
export const navigationMenuPersonal = [
    <MenuModel>{
        menuTitle: 'My Profile',
        menuHref: '/my-profile',
        menuIcon: 'person'
    }, <MenuModel>{
        menuTitle: 'Balance',
        menuHref: '/balance',
        menuIcon: 'account_balance_wallet'
    }, <MenuModel>{
        menuTitle: 'Wishlist',
        menuHref: '/wishlist',
        menuIcon: 'shopping_basket'
    }, <MenuModel>{
        menuTitle: 'Message',
        menuHref: '/message',
        menuIcon: 'email',
        menuNotification: 3
    }, <MenuModel>{
        menuTitle: 'Product Reviews',
        menuHref: '/product-reviews',
        menuIcon: 'comment',
        menuNotification: 3
    }, <MenuModel>{
        menuTitle: 'Favorite Vendors',
        menuHref: '/favorite-vendors',
        menuIcon: 'store'
    }, <MenuModel>{
        menuTitle: 'Purchase History',
        menuHref: '/purchase-history',
        menuIcon: 'history'
    }, <MenuModel>{
        menuTitle: 'Account settings',
        menuHref: '/account-settings',
        menuIcon: 'tune'
    }, <MenuModel>{
        menuTitle: 'Log Out',
        menuHref: '/log-out',
        menuIcon: 'exit_to_app'
    }];
