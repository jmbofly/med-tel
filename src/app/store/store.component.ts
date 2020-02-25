import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';

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
  selectedProduct: Product;
  loggedIn: Observable<boolean>;
  user: UserModel;

  storeConfig: any;
  cart: Cart;
  constructor(
    private userService: UserService,
    private modalService: NgbModal,
    private shopService: ShopService,
    private router: Router,
    public route: ActivatedRoute
  ) {
    // this.route.paramMap.subscribe(params => {
    //   console.log('store params', params);
    //   if (params.keys.length > 0) {
    //     if (params.has('catId')) {
    //       this.sortProducts(params.get('catId'))
    //     }
    //     console.log('store list params', params);
    //   }
    // });
  }

  ngOnInit() {
    this.shopService.cart$.subscribe(cart => this.cart = cart);
    this.productList = this.shopService.availableProducts;
  }

  clearCart() {
    this.shopService.emptyCart();
  }

  sortProducts(category: string) {
    const list = this.shopService.availableProducts;
    if (category === 'all') {
      this.productList = list;
    } else {
      this.productList = list.filter(item => {
        for (const i of item.category) {
          if (i === category) {
            return item;
          }
        }
      });
    }
  }

  async navigateTo(url = '/checkout') {
    return await this.router.navigateByUrl(url);
  }

  async productSelected(event, content: TemplateRef<any>) {
    // console.log('selected product', event);
    this.selectedProduct = this.shopService.getProductDetails(event);
    return await this.openDetailsModal(content, this.selectedProduct);
  }

  async openDetailsModal(content: TemplateRef<any>, product: Product) {
    const modalRef = this.modalService.open(content, {
      ariaLabelledBy: 'modal-product-title',
    });
    return await modalRef.result.then(results =>
      console.log('modal results', results)
    );
  }

  addToCart(productId: string) {
    this.shopService.addToCart(productId);
    this.modalService.dismissAll();
  }
}
