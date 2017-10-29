import { navigationMenuCategories } from './../../../shared/mock-data/navigation-menu-categories';
import { navigationMenuGuest } from './../../../shared/mock-data/navigation-menu-guest';
import { navigationMenuPersonal } from './../../../shared/mock-data/navigation-menu-personal';
import { navigationMenu } from './../../../shared/mock-data/navigation-menu';
import { MenuListModel } from './../../../shared/models/menu/menu-list.model';
import { MenuModel } from './../../../shared/models/menu/menu.model';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-core',
  templateUrl: './core.layout.html',
  styleUrls: ['./core.layout.scss']
})
// tslint:disable-next-line:component-class-suffix
export class CoreLayout implements OnInit {
  routes: MenuModel[];
  usermenu: MenuModel[];
  guestMenu: MenuModel[];
  categoriesMenu: MenuListModel[];

  constructor() { }

  ngOnInit() {
    this.routes = navigationMenu;
    this.usermenu = navigationMenuPersonal;
    this.guestMenu = navigationMenuGuest;
    this.categoriesMenu = navigationMenuCategories;
  }

}
