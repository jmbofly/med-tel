import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable, BehaviorSubject } from 'rxjs';
import { UserService } from '../core/user.service';
import { ToastService } from '../core/toast.service';
import { Products } from '../core/data/products';
import { Divider, DIVIDERS } from './home.data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  dividers: any[];
  products = Products
  // bannerRow1Products = Products.filter((item, idx) => idx <= 1);
  // bannerRow2Products = Products.filter((item, idx) => idx >= 2 && idx <= 3);
  // bannerRow3Products = Products.filter((item, idx) => idx === 4);

  newsletterSent = false;
  panelImages: any[];
  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    public toastService: ToastService
  ) { }

  ngOnInit() {
    this.dividers = DIVIDERS;
    this.getPanelImages();
  }

  getPanelImages() {
    const dir = 'assets/images/masthead';
    const imagePrefix = 'Smokiez_OM_CBD_';
    const imageType = 'png';
    this.panelImages = [
      'Blackberry',
      'Blue_Raspberry',
      'Watermelon'
    ].map(img => ({ id: `SMOKIEZ_GUMMIES_${img.toUpperCase()}`, src: `${dir}/${imagePrefix}${img}.${imageType}` }));
    console.log(this.panelImages);
  }

  navigateTo(url: string, params?: any) {
    return this.router.navigate([`${url}`]);
  }

  async sendNewsletter(email: string) {
    if (!email) {
      this.showError('You must provide your email address!', {
        type: 'danger',
        dismissible: true,
      });
      return;
    }
    return await this.userService.addNewSubscriber(email).then(ref => {
      return this.showSuccess(
        'Thank you for subscribing! Check your email every month for MedTelPlus Newsletter',
        {
          type: 'success',
          dismissible: true,
        }
      );
    });
  }

  private showError(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toastService.show(textOrTpl, options);
  }

  private showSuccess(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toastService.show(textOrTpl, options);
  }
}
