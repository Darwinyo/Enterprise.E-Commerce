import { CartViewmodel } from './../../viewmodels/cart/cart.viewmodel';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-core-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  @Output() reviewEvent: EventEmitter<string>;
  @Input() cartList: CartViewmodel[];
  constructor() {
    this.reviewEvent = new EventEmitter();
    this.cartList = [];
  }

  ngOnInit() {

  }
  onProductItem_Clicked(productId: string) {
    this.reviewEvent.emit(productId);
  }
}
