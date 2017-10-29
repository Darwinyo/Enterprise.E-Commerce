import { notifications } from './../../../shared/mock-data/notifications';
import { NotificationModel } from './../../models/notification/notification.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-core-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  @Input() notification: NotificationModel[];
  @Output() navigateEvent: EventEmitter<string>;
  constructor() {
    this.navigateEvent = new EventEmitter();
  }

  ngOnInit() {
  }
  onNotification_Clicked(url: string) {
    this.navigateEvent.emit(url);
  }
}
