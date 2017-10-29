import { MatIconModule, MatListModule } from '@angular/material';
import { notifications } from './../../../shared/mock-data/notifications';
import { NotificationModel } from './../../models/notification/notification.model';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NotificationComponent } from './notification.component';

describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let componentEl: HTMLElement;
  let fixture: ComponentFixture<NotificationComponent>;
  let notification: NotificationModel[];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationComponent],
      imports: [MatIconModule, MatListModule]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;
    componentEl = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    notification = notifications;
  });
  afterEach(() => {
    component = null;
    componentEl = null;
    fixture = null;
    notification = null;
  });
  describe('UI Tests', () => {
    it('should populate Notifications when notification defined', async(() => {
      component.notification = notification;
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(componentEl.innerHTML).toContain(notification[0].notificationMessage);
        expect(componentEl.innerHTML).toContain(notification[0].notificationDate);
        expect(componentEl.innerHTML).toContain(notification[0].notificationIcon);
      });
    }));
    it('should not display Notifications when notification undefined', async(() => {
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(componentEl.innerHTML).not.toContain(notification[0].notificationMessage);
        expect(componentEl.innerHTML).not.toContain(notification[0].notificationDate);
        expect(componentEl.innerHTML).not.toContain(notification[0].notificationIcon)
      });
    }));
  });
  describe('Functionality Tests', () => {
    it('should emit navigateEvent when notification clicked', async(() => {
      component.notification = notification;
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        spyOn(component.navigateEvent, 'emit');
        (<HTMLAnchorElement>componentEl.children[0]).click();
        expect(component.navigateEvent.emit).toHaveBeenCalledWith(notification[0].notificationUrl);
      });
    }));
  });
});
