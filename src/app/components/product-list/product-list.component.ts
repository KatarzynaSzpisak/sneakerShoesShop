import { Component } from '@angular/core';
import { CartService } from 'src/app/cart.service';
// import {MatCardModule, MatGridListModule } from '@angular/material';

// import { product } from '../product';

export interface IProduct {
  id: number;
  name: string;
  price: number;
  actualCost: number;
  imageUrl: string;
  details: string;
  color: {
    colorName: string;
  }
  size: {
    sizeName: string;
  }
  material: {
    materialName: string;
  }
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  products: IProduct[];
  _service: CartService;

  constructor(service: CartService) {
    this._service = service;
  }

  addToCart(product: IProduct) {
    console.log(this._service);
    this._service.addToCart(product);
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
