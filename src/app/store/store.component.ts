import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { UserService } from '../core/user.service';
import { AuthService } from '../core/auth.service';
import { ShopService } from '../core/shop.service';
import { Products, Product } from '../core/products.data';
import { UserModel } from '../core/user.model';

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
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private modalService: NgbModal,
    private shopService: ShopService,
    private router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loggedIn = this.authService.loggedIn();
    this.authService
      .getUserId()
      .pipe(
        map(id => {
          this.shopService.initNewShopper(id).user.subscribe(user => {
            this.user = user;
          });
        })
      )
      .subscribe();

    this.productList = Array.from(Products);
    if (this.user) {
      this.wishList = this.user.wishList;
    }
  }

  addToWishList(productId: string, currentList: string[]) {
    if (!this.user) {
      return;
    }
    const wishList = this.user.wishList;
    wishList.push(productId);
    this.userService.updateUser(this.user.uid, { wishList });
  }

  removeFromWishList(wishList: string[], productId) {
    const item = wishList.indexOf(productId);
    wishList.splice(item);
    this.userService.updateUser(this.user.uid, {
      ...wishList,
    });
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
    console.log('selected product', event);
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
    this.shopService.addToCart(this.user.uid, productId, this.user.cart);
    this.modalService.dismissAll();
  }
}
