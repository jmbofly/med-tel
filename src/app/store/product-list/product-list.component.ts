import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Product } from '../../core/interfaces/product';
import { Cart } from '../../core/interfaces/cart';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ShopService } from 'src/app/core/shop.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  @Input() productList?: Product[];
  @Input() userCart?: Cart;
  @Output() productSelected = new EventEmitter<string>();
  @Output() addedToCart = new EventEmitter<string>();
  showToaster = false;
  constructor(private router: Router,
    public shopService: ShopService,
    public route: ActivatedRoute
  ) {
    // this.route.paramMap.subscribe((params: ParamMap) => {
    //   if (params.keys.length > 0) {
    //     console.log('store list params', params);
    //     this.productList = this.shopService.availableProducts.filter(product => {
    //       product.category.filter(cat => cat === params.get('catId'))
    //     });
    //     this.userCart = this.shopService.cart;
    //   }
    // });
  }

  selectProduct(productId: string) {
    // this.router.navigate(['product', productId]);
    this.productSelected.emit(productId);
  }

  addToCart(productId: string) {
    // this.shopService.addToCart(productId);
    // this.toggleToaster();
    // setTimeout(() => {
    //   this.toggleToaster();
    // }, 3000);
    this.addedToCart.emit(productId);
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

  ngOnInit() {
  }
}
