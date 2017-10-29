import { MenuModel } from './../../../shared/models/menu/menu.model';
import { userMenuViewModel } from './../../../shared/mock-data/user-menu-view-model';
import { UserMenuViewModel } from './../../viewmodels/user-menu/user-menu.viewmodel';
import { MatIconModule } from '@angular/material';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserMenuComponent } from './user-menu.component';
import { userMenu } from '../../../shared/mock-data/user-menu';

describe('[CORE] [COMPONENT] USER-MENU-COMPONENT', () => {
  let component: UserMenuComponent;
  let componentEl: HTMLElement;
  let fixture: ComponentFixture<UserMenuComponent>;
  let userMenuModel: UserMenuViewModel;
  let userMenus: MenuModel[];
  let anchorUserLogin: HTMLAnchorElement;
  let anchorBalance: HTMLAnchorElement;
  let anchorLogout: HTMLAnchorElement;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserMenuComponent],
      imports: [MatIconModule]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  beforeEach(() => {
    componentEl = fixture.debugElement.nativeElement;
    userMenuModel = userMenuViewModel;
    userMenus = userMenu;
  });
  afterEach(() => {
    component = null;
    componentEl = null;
    fixture = null;
    userMenuModel = null;
    userMenus = null;
  });
  describe('UI Tests', () => {
    it('should display user menu when userMenuViewModel is defined', async(() => {
      component.userMenuViewModel = userMenuModel;
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(componentEl.innerHTML).toContain(userMenuModel.userLogin);
        expect(componentEl.innerHTML).toContain(userMenuModel.balance.toString());
      });
    }));
    it('should not display user menu when userMenuViewModel is undefined', async(() => {
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(componentEl.innerHTML).not.toContain(userMenuModel.userLogin);
        expect(componentEl.innerHTML).not.toContain(userMenuModel.balance.toString());
      });
    }));
    it('should populate menu when menu model is defined', async(() => {
      component.menuModel = userMenus;
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(componentEl.innerHTML).toContain(userMenus[0].menuTitle);
        expect(componentEl.innerHTML).toContain(userMenus[1].menuTitle);
        expect(componentEl.innerHTML).toContain(userMenus[2].menuTitle);
        expect(componentEl.innerHTML).toContain(userMenus[3].menuTitle);
        expect(componentEl.innerHTML).toContain(userMenus[4].menuTitle);
      });
    }));
    it('should not populate menu when menu model is undefined', async(() => {
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(componentEl.innerHTML).not.toContain(userMenus[0].menuTitle);
        expect(componentEl.innerHTML).not.toContain(userMenus[1].menuTitle);
        expect(componentEl.innerHTML).not.toContain(userMenus[2].menuTitle);
        expect(componentEl.innerHTML).not.toContain(userMenus[3].menuTitle);
        expect(componentEl.innerHTML).not.toContain(userMenus[4].menuTitle);
      });
    }));
  });
  describe('Functionality Tests', () => {
    beforeEach(() => {
      spyOn(component.navigateEvent, 'emit');
    });
    it('should emit navigateEvent when anchors clicked', async(() => {
      component.userMenuViewModel = userMenuModel;
      component.menuModel = userMenus;
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        anchorUserLogin = <HTMLAnchorElement>componentEl.children[0].children[0];
        anchorBalance = <HTMLAnchorElement>componentEl.children[0].children[2];
        anchorLogout = <HTMLAnchorElement>componentEl.children[10];
        anchorUserLogin.click();
        expect(component.navigateEvent.emit).toHaveBeenCalledWith(component.myProfileUrl);
        anchorBalance.click();
        expect(component.navigateEvent.emit).toHaveBeenCalledWith(component.balanceUrl);
        anchorLogout.click();
        expect(component.navigateEvent.emit).toHaveBeenCalledWith(component.menuModel[4].menuHref);
      });
    }));
  });
});
