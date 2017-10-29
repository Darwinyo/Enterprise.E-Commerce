import { MenuModel } from './../models/menu/menu.model';
export const userMenu = [
    <MenuModel>{
        menuTitle: 'Purchase History',
        menuHref: '/purchase-history',
        menuIcon: 'history'
    }, <MenuModel>{
        menuTitle: 'Wishlist',
        menuHref: '/wishlist',
        menuIcon: 'shopping_basket'
    }, <MenuModel>{
        menuTitle: 'Favorite Vendors',
        menuHref: '/favorite-vendors',
        menuIcon: 'store'
    }, <MenuModel>{
        menuTitle: 'Account settings',
        menuHref: '/account-settings',
        menuIcon: 'tune'
    }, <MenuModel>{
        menuTitle: 'Log Out',
        menuHref: '/log-out',
        menuIcon: 'exit_to_app'
    }];
