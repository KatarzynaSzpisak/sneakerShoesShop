import {Component, OnInit} from '@angular/core';

import {CartService} from '../../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(public cartService: CartService,) {
  }

  ngOnInit() {
    console.log(this.cartService.getItems())
  }

  onSubmit(customerData) {
    // Process checkout data here
    console.warn('Your order has been submitted', customerData);
    this.cartService.clearCart();
  }

  removeCartItem(id: number) {
    this.cartService.removeCartItem(id)
    window.location.reload()
  }
}
