import { MenuModel } from './../models/menu/menu.model';
export const messageMenu = [
    <MenuModel>{
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
        menuTitle: 'Customer Service',
        menuHref: '/customer-service',
        menuIcon: 'room_service'
    }];
