import { MenuModel } from './../../../shared/models/menu/menu.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-core-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {
  @Input() menuModel: MenuModel[];
  constructor() { }

  ngOnInit() {
  }

}
