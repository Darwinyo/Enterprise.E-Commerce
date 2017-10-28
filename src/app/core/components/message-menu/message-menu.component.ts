import { MenuModel } from './../../../shared/models/menu/menu.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-core-message-menu',
  templateUrl: './message-menu.component.html',
  styleUrls: ['./message-menu.component.scss']
})
export class MessageMenuComponent implements OnInit {
  @Input() menuModel: MenuModel[];
  constructor() { }

  ngOnInit() {
  }

}
