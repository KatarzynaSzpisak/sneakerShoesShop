import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProduct } from './components/product-list/product-list.component';
import { Observable } from 'rxjs';
import { isNgTemplate } from '@angular/compiler';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items = [];

  constructor(
    private http: HttpClient,
    private router: Router) {}

  firstLoad() {
    // TODO getItem in local storage
    const fromLs = localStorage.getItem('cart');
    if (fromLs === undefined) {
      // do nothing
      this.items = [];
    } else {
      this.items = JSON.parse(fromLs);
    }
  }

  async addToCart(product: IProduct) {
    this.items.push(product);
    localStorage.setItem('cart', JSON.stringify(this.items));
  }

  getItems() {
    return this.items;
  }

  async removeCartItemAsync(orderRowId) {
    const response = await fetch(
      'http://localhost:5000/orderRow/' + orderRowId,
      {
        method: 'DELETE'
      }
    );
  }

  removeCartItem(orderRowId) {
    // TODO splice items array?
    this.removeCartItemAsync(orderRowId).then(_ => location.reload());
    localStorage.setItem('cart', JSON.stringify(this.items));

  }

  totalPrice(items) {
    let summ = 0;
    items.forEach(element => {
      summ += element.price;
    });
    return summ;
  }

  getShippingPrices() {
    return this.http.get('/assets/shipping.json');
  }

  async createOrder() {
    const response = await fetch('http://localhost:5000/order/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.items)
    });
    this.clearCart();
    this.router.navigate(['/thanks']);
  }


  clearCart() {
    this.items = [];
    localStorage.setItem('cart', JSON.stringify(this.items));
  }
}
