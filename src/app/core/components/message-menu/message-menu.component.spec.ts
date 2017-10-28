import { CovalentNotificationsModule } from '@covalent/core';
import { MatListModule, MatIconModule } from '@angular/material';
import { messageMenu } from './../../../shared/mock-data/message-menu';
import { MenuModel } from './../../../shared/models/menu/menu.model';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MessageMenuComponent } from './message-menu.component';

fdescribe('MessageMenuComponent', () => {
  let component: MessageMenuComponent;
  let fixture: ComponentFixture<MessageMenuComponent>;
  let componentEl: HTMLElement;
  let menuModel: MenuModel[];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MessageMenuComponent],
      imports: [MatListModule, MatIconModule, CovalentNotificationsModule]
    });
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MessageMenuComponent);
    component = fixture.componentInstance;
    componentEl = fixture.debugElement.nativeElement;
    menuModel = messageMenu;
    fixture.detectChanges();
  }));
  afterEach(() => {
    component = null;
    fixture = null;
    componentEl = null;
    menuModel = null;
  });
  describe('UI Tests', () => {
    it('should populate all Menu when Input is defined', async(() => {
      component.menuModel = menuModel;
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(componentEl.innerHTML).toContain(menuModel[0].menuTitle);
        expect(componentEl.innerHTML).toContain(menuModel[1].menuTitle);
        expect(componentEl.innerHTML).toContain(menuModel[2].menuTitle);
      });
    }));
  });
  describe('Functionality Tests', () => {
    it('should emit navigate event when menu clicked', async(() => {
      component.menuModel = menuModel;
      spyOn(component.navigateEvent, 'emit');
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        (<HTMLAnchorElement>componentEl.children[0]).click();
        expect(component.navigateEvent.emit).toHaveBeenCalledWith(menuModel[0].menuHref);
      });
    }));
  });
});
