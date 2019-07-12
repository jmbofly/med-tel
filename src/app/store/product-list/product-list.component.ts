import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product, Cart } from '../../core/products.data';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  @Input() productList: Product[];
  @Input() userCart?: Cart;
  @Input() loggedIn: boolean;
  @Output() productSelected = new EventEmitter<string>();
  @Output() addedToCart = new EventEmitter<string>();
  @Output() addedToWishList = new EventEmitter<string>();
  showToaster = false;
  constructor() {}

  addToCart(productId: string) {
    // this.toggleToaster();
    // setTimeout(() => {
    //   this.toggleToaster();
    // }, 2000);
    this.addedToCart.emit(productId);
  }

  addToWishList(id: string) {
    this.addedToWishList.emit(id);
  }

  selectProduct(productId: string) {
    this.productSelected.emit(productId);
  }

  getItemTagClass(tag: string) {
    if (tag === 'sale') {
      return 'block2-labelsale';
    } else if (tag === 'new') {
      return 'block2-labelnew';
    } else if (tag === 'soldout') {
      return 'block2-labelsoldout';
    }
  }

  toggleToaster() {
    this.showToaster = !this.showToaster;
  }

  ngOnInit() {}
}
