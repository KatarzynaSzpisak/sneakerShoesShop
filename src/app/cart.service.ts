import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {IProduct} from "./components/product-list/i.product";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: IProduct[] = [];

  constructor(
    private http: HttpClient,
    private router: Router) {
  }

  firstLoad() {
    console.log("cartservice: firstload")

    // TODO getItem in local storage
    const fromLs = localStorage.getItem('cart');
    if (fromLs === undefined) {
      // do nothing
      this.items = [];
    } else {
      this.items = JSON.parse(fromLs) || [];
    }
  }

  addToCart(product: IProduct) {
    this.items.push(product);
    localStorage.setItem('cart', JSON.stringify(this.items));
  }

  getItems() {
    return this.items;
  }

  async removeCartItemAsync(orderRowId) {
    return fetch(
      'http://localhost:5000/orderRow/' + orderRowId,
      {
        method: 'DELETE'
      }
    );
  }

  removeCartItem(index: number) {
    // this.removeCartItemAsync(orderRowId).then(_ => location.reload());
    // this.items = this.items.filter((i: IProduct) => i.id != orderRowId)
    this.items.splice(index, 1)
    console.log(this.items)
    localStorage.setItem('cart', JSON.stringify(this.items))
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
