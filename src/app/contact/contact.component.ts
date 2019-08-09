import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
// import { AngularFireFunctions } from '@angular/fire/functions';
import { BehaviorSubject } from 'rxjs';

import { UserService } from '../core/user.service';
import { Contact } from '../core/interfaces/contact';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit, OnDestroy {
  contact: Contact = {};
  contactSaved = false;

  formIsReady: BehaviorSubject<boolean>;
  constructor(
    public userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // this.formIsReady = new BehaviorSubject(false);
  }

  ngOnInit() {
    this.formIsReady = new BehaviorSubject(false);
  }

  ngOnDestroy() {
    this.formIsReady.unsubscribe();
    console.log('destroyed contacts');
  }

  async addNewContact(contact: Contact) {
    return await this.userService.addNewContact(contact).then(val => {
      this.contact = {};
      setTimeout(() => {
        this.contactSaved = false;
      }, 5000);
      this.contactSaved = true;
    });
  }

  navigateTo(url: string) {
    return this.router.navigateByUrl(url);
  }

  formStatus(form: NgForm) {
    // console.log(form);
  }
}
