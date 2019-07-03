import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';

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
  userId: string;
  user: UserModel = null;
  constructor(
    public authService: AuthService,
    private modalService: NgbModal,
    private shopService: ShopService,
    private router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.authService
      .getUserId()
      .pipe(
        map(uid => {
          if (uid) {
            this.shopService
              .getCurrentShopper(uid)
              .subscribe(user => (this.user = user ? user : null));
            console.log('user uid: ', uid);
          }
        })
      )
      .subscribe();

    this.productList = this.shopService.availableProducts;
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
    this.shopService.userService.updateUser(this.user.uid, { wishList });
  }

  removeFromWishList(currentList: string[], productId) {
    const item = currentList.indexOf(productId);
    currentList.splice(item);
    this.shopService.userService.updateUser(this.user.uid, {
      wishList: currentList,
    });
  }

  sortProducts(category: string) {
    if (category === 'all') {
      this.productList = this.shopService.availableProducts;
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
    if (this.user) {
      this.shopService.addToCart(this.user.uid, productId, this.user.cart);
      this.modalService.dismissAll();
    }
  }
}
