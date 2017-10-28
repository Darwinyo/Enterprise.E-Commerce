import { MenuModel } from './../../../shared/models/menu/menu.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-core-message-menu',
  templateUrl: './message-menu.component.html',
  styleUrls: ['./message-menu.component.scss']
})
export class MessageMenuComponent implements OnInit {
  @Input() menuModel: MenuModel[];
  @Output() navigateEvent: EventEmitter<string>;
  constructor() {
    this.navigateEvent = new EventEmitter();
  }

  ngOnInit() {
  }
  onMenu_Clicked(url: string) {
    this.navigateEvent.emit(url);
  }
}
