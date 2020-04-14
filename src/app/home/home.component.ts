import { Component, OnInit, TemplateRef, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgModel } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';
import { UserService } from '../core/user.service';
import { ToastService } from '../core/toast.service';
import { Divider, DIVIDERS } from './home.data';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  dividers: any[];
  newsletterSent = false;
  panelImages: any[];
  subscriber = {
    email: ''
  }
  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    public toastService: ToastService
  ) { }

  ngOnInit() {
    this.dividers = DIVIDERS;
  }

  navigateTo(url: string, params?: any) {
    return this.router.navigate([`${url}`]);
  }

  async sendNewsletter(email: string) {
    await this.userService.addNewSubscriber(email).then(ref => {
      this.showSuccess(
        'Thank you for subscribing! Check your email for MedTelPlus updates.',
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
