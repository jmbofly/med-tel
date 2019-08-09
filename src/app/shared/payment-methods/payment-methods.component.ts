import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  Inject,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { UserService } from '../../core/user.service';
import { PaymentMethod, Card } from '../../core/interfaces/payment';
import { UserModel } from '../../core/interfaces/user';

@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.scss'],
})
export class PaymentMethodsComponent implements OnInit, OnDestroy {
  @Output() updatePaymentMethods = new EventEmitter<PaymentMethod[]>();
  @Output() closeModal = new EventEmitter<any>();
  @Input() billingData: UserModel['billing'];
  methods: PaymentMethod[];
  newMethod: PaymentMethod;
  readyToSaveMethod: BehaviorSubject<boolean>;

  showNewInputContainer = false;
  errorMessage = '';
  constructor(private userService: UserService) {
    this.readyToSaveMethod = new BehaviorSubject(false);
  }

  addNewPaymentMethod(methods: PaymentMethod[], paymentMethod: PaymentMethod) {
    if (
      methods.filter(
        item => item.card.cardNumber === paymentMethod.card.cardNumber
      ).length
    ) {
      this.errorMessage = 'Payment Method Exists!';
      this.toggleInputContainer();
      return;
    }
    const date = Date.now();
    paymentMethod.id = `${Math.floor(Math.random() * (date + 1))}`;
    methods.push(paymentMethod);
    this.newMethod = {
      type: null,
      id: null,
      card: {},
    };
    this.toggleInputContainer();
    this.updatePaymentMethods.emit(methods);
  }

  dismissModal(response: any | PaymentMethod[] | PaymentMethod) {
    this.closeModal.emit(response);
  }

  removePaymentMethod(methods: PaymentMethod[], idx: number) {
    if (methods.includes(methods[idx])) {
      methods.splice(idx, 1);
      this.updatePaymentMethods.emit(methods);
    }
  }
  formatViewableCardData(
    cardNumber?: Card['cardNumber'],
    email?: string,
    preference?: 'default' | 'alternate'
  ) {
    if (!cardNumber) {
      return `<span class="badge badge-primary">
      <i class="fa fa-paypal fa-2x" aria-hidden="true"></i>
      </span>
      <span class="list-inline-item"> ${email}
      </span>
      <small class="text-danger pl-4 mr-2"> default payment method</small>`;
    }
    const viewable = cardNumber.slice(12, cardNumber.length);
    return `<span class="badge badge-primary">
      <i class="fa fa-credit-card fa-2x" aria-hidden="true"></i>
      </span>
      <span class="list-inline-item">
      <b class="text-danger">xxxx-xxxx-xxxx-${viewable}</b>
      </span>`;
  }

  toggleInputContainer() {
    this.showNewInputContainer = !this.showNewInputContainer;
  }

  ngOnInit() {
    this.methods = this.billingData.savedPaymentMethods;
    this.newMethod = {
      type: null,
      id: null,
      card: {
        expiration: { month: null, year: null },
        cardNumber: null,
        cvv: null,
      },
    };
  }

  ngOnDestroy() {}

  formatExpiration(dateInput: any) {
    return `${dateInput.month}/${dateInput.year}`;
  }

  validateCreditCardNumber(ccNum?: any, validation = false) {
    const visaRegEx = /(?:4[0-9]{12}(?:[0-9]{3})?)/;
    const mastercardRegEx = /(?:5[1-5][0-9]{14})/;
    const amexpRegEx = /(?:3[47][0-9]{13})/;
    const discovRegEx = /(?:6(?:011|5[0-9][0-9])[0-9]{12})/;
    const regExList = [visaRegEx, mastercardRegEx, amexpRegEx, discovRegEx];

    if (ccNum && validation) {
      const list = regExList.map((reg: RegExp, idx: number) => {
        const tested = reg.test(ccNum);
        if (tested) {
          return reg.source;
        } else {
          return tested;
        }
      });
      return list[0];
    }
  }

  readyToSave(method: PaymentMethod, form?: NgForm) {
    // Check if type is PayPal
    if (method.type && method.type === 'paypal') {
      // If true return because no other input is needed
      return true;
    }
    // Check if type is either credit or debit
    if ((method.type && method.type === 'debit') || method.type === 'credit') {
      const exp = method.card.expiration;
      const card = method.card;
      const cvv = card.cvv;
      const expired = Date.UTC(exp.year, exp.month) < Date.now();
      // If true check that ALL card fields have values
      if (card && !expired && cvv && cvv.length === 3 && card.cardNumber) {
        console.log(expired, card, method);
        return true;
      }
    } else {
      return false;
    }
  }
}
