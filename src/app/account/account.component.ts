import {
  Component,
  OnInit,
  OnDestroy,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { AuthService } from '../core/auth.service';
import { UserService } from '../core/user.service';
import { UserModel, PaymentMethod } from '../core/user.model';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit, OnDestroy {
  currentTab: BehaviorSubject<string>;
  user: UserModel = {};
  userUpdates: UserModel = {};
  purchaseStream$: Observable<PaymentMethod[]>;
  methodStream$: Observable<PaymentMethod[]>;
  passwordsMatch: BehaviorSubject<boolean>;
  hasPassword: boolean;
  uploading: Observable<boolean>;
  showAvatarEdit = false;

  showPurchaseHistory = false;
  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private modalService: NgbModal
  ) {
    this.passwordsMatch = new BehaviorSubject(false);
    this.currentTab = new BehaviorSubject('account');
    this.userUpdates = {};
    this.user = {};
  }

  ngOnInit() {
    this.authService.getUserId().subscribe(uid => {
      this.userService
        .getUserById(uid)
        .valueChanges()
        .subscribe(user => {
          this.userConfig(user);
        });
    });
    // this.currentTab.next('profile');
  }

  ngOnDestroy() {
    this.passwordsMatch.complete();
    this.currentTab.complete();
    console.log('destroyed account');
  }

  private userConfig(user: UserModel) {
    this.user = user;
    this.userUpdates = user;
    this.hasPassword = !!user.password;
  }

  private track(list: PaymentMethod[]) {
    return combineLatest(
      (): PaymentMethod[] => {
        return list;
      }
    );
  }

  getTimestamp(timestamp?: any) {
    return timestamp.toDate();
  }

  getGreetingTime(m = moment()) {
    let g = null; // return g

    if (!m || !m.isValid()) {
      return;
    } // if we can't find a valid or filled moment, we return.

    const splitAfternoon = 12; // 24hr time to split the afternoon
    const splitEvening = 17; // 24hr time to split the evening
    const currentHour = parseFloat(m.format('HH'));

    if (currentHour >= splitAfternoon && currentHour <= splitEvening) {
      g = 'afternoon';
    } else if (currentHour >= splitEvening) {
      g = 'evening';
    } else {
      g = 'morning';
    }

    return g;
  }

  addedChanges(key: string, changes: UserModel, mergeTo: UserModel) {
    // console.log('merge', changes, mergeTo);
    // return changes[key] !==
  }

  mergeChanges(field: string, newValue: UserModel, updated) {
    updated[field] = newValue;
    this.addedChanges(field, newValue, updated);
  }

  checkAgainstCurrentPassword(input, current) {
    const match = current === input;
    this.passwordsMatch.next(match);
  }

  editAvatar() {
    this.showAvatarEdit = !this.showAvatarEdit;
  }

  toggleTab(tab: string) {
    this.currentTab.next(tab);
  }

  togglePurchaseHistoryWindow() {
    this.showPurchaseHistory = !this.showPurchaseHistory;
  }

  openAccountModal(template: string | TemplateRef<any>, options?: any | NgbModalOptions, callback?: any) {
    const defaults = {
      ariaLabelledBy: 'account-options',
      backdrop: 'static',
      size: 'lg'
    };
    const opts = {...defaults, ...options};
    const modalRef = this.modalService.open(template, opts);
    modalRef.result.then(response => {
      console.log('add-payment-method modal response', response);
    });
  }

  updateUserData(loader, newData: any, key?: string) {
    if (newData) {
      loader.load();
      this.modalService.dismissAll('updating data...');
      this.userService.updateUser(this.user.uid, newData);
    }
  }

  updatePaymentMethods(methods: PaymentMethod[], loader) {
    const expDates = methods.map(method => method.card ? method.card.expiration : new Error('expiration date missing from payment method'));
    console.log(expDates);
    this.user.billing.savedPaymentMethods = methods;
    this.updateUserData(loader, this.user);
  }
}
