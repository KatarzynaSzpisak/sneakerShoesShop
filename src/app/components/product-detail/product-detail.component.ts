import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CartService} from '../../cart.service';
import {IProduct} from "../product-list/i.product";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  productId: number;
  product: IProduct;

  constructor(
    private route: ActivatedRoute,
    public cartService: CartService) {
  }

  addToCart(product: IProduct) {
    this.cartService.addToCart(product);
    window.alert('Your product has been added to the cart!');
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.productId = +params.get('id');

      fetch('http://localhost:5000/product/' + this.productId)
        .then(response => response.json())
        .then((data: IProduct) => (this.product = data));
    });
  }
}
