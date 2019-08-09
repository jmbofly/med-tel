import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { UserService } from '../core/user.service';
import { ShopService } from '../core/shop.service';
import { Products } from '../core/data/products';
import { Product } from '../core/interfaces/product';
import { Cart } from '../core/interfaces/cart';
import { UserModel } from '../core/interfaces/user';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
})
export class StoreComponent implements OnInit {
  productList: any[];
  wishList: string[];
  selectedProduct: Product;
  loggedIn: Observable<boolean>;
  userId: string;
  user: UserModel;

  storeConfig: any;
  cart: Cart;
  constructor(
    private userService: UserService,
    private modalService: NgbModal,
    private shopService: ShopService,
    private router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.cart = this.shopService.cart;
    this.productList = Array.from(Products);
  }

  sortProducts(category: string) {
    if (category === 'all') {
      this.productList = Products;
    } else {
      this.productList = this.productList.filter(item => {
        for (const i of item.category) {
          if (i === category) {
            return item;
          }
        }
      });
    }
  }

  productSelected(event, content: TemplateRef<any>) {
    // console.log('selected product', event);
    this.selectedProduct = this.shopService.getProductDetails(event);
    this.openDetailsModal(content, this.selectedProduct);
  }

  openDetailsModal(content: TemplateRef<any>, product: Product) {
    const modalRef = this.modalService.open(content, {
      ariaLabelledBy: 'modal-product-title',
    });
    modalRef.result.then(results => console.log('modal results', results));
  }

  addToCart(productId: string) {
    this.shopService.addToCart(productId);
    this.modalService.dismissAll();
  }
}
