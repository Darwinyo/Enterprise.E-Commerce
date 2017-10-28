import { DebounceTime } from './../../../shared/consts/config.const';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-core-nav-searchbar',
  templateUrl: './nav-searchbar.component.html',
  styleUrls: ['./nav-searchbar.component.scss']
})
export class NavSearchbarComponent implements OnInit {
  @Output() searchEvent: EventEmitter<string>;
  debounceTime: number;
  searchInputTerm: string;
  constructor() {
    this.searchEvent = new EventEmitter();
    this.debounceTime = DebounceTime;
  }

  ngOnInit() {
  }
  onSearch(searchTerm: string) {
    this.searchInputTerm = searchTerm;
    this.searchEvent.emit(this.searchInputTerm);
  }
  onClear() {
    this.searchInputTerm = '';
  }
}
