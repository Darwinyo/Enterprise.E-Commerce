import { MenuModel } from './menu.model';
export interface MenuListModel {
    menuTitle: string;
    menuChild: MenuModel[];
}
