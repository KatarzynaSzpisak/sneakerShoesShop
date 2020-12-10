import {Component} from '@angular/core';
import {CartService} from 'src/app/cart.service';
import {IProduct} from "./i.product";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent {
  products: IProduct[];

  constructor(public cartService: CartService) {
  }

  addToCart(product: IProduct) {
    this.cartService.addToCart(product);
    window.alert('Your product has been added to the cart!');
  }

  share() {
    window.alert('The product has been shared!');
  }

  onNotify() {
    window.alert('You will be notified when the product goes on sale');
  }

  // tslint:disable-next-line: use-life-cycle-interface
  ngOnInit() {
    fetch('http://localhost:5000/product')
      .then(response => response.json())
      .then((data: IProduct[]) => (this.products = data));
  }
}
