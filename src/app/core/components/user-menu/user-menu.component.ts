import { myProfile, balance } from './../../../shared/consts/url.const';
import { UserMenuViewModel } from './../../viewmodels/user-menu/user-menu.viewmodel';
import { MenuModel } from './../../../shared/models/menu/menu.model';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-core-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {
  @Input() menuModel: MenuModel[];
  @Input() userMenuViewModel: UserMenuViewModel;
  @Output() navigateEvent: EventEmitter<string>;
  myProfileUrl: string;
  balanceUrl: string;
  constructor() {
    this.navigateEvent = new EventEmitter();
    this.myProfileUrl = myProfile;
    this.balanceUrl = balance;
  }

  ngOnInit() {
  }
  onMenu_Clicked(url: string) {
    this.navigateEvent.emit(url);
  }
}
