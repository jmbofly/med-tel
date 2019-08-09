import { Component, OnInit, Input } from '@angular/core';
import { UserModel } from '../../core/interfaces/user';
@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.scss'],
})
export class PurchaseHistoryComponent implements OnInit {
  @Input() history: UserModel['billing']['purchaseHistory'];
  show = {
    shortList: true,
    longList: false,
    withFilter: false,
    declined: false,
  };

  historyFiltered = false;
  historyLength = false;
  constructor() {}

  ngOnInit() {
    if (this.history && this.history.length) {
      this.historyLength = true;
    } else {
      this.historyLength = false;
    }
  }

  toggleList(list: string) {
    this.show[list] = !this.show[list];
  }
}
