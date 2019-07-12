import { Component, OnInit, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';

import { AuthService } from '../core/auth.service';
import { UserService } from '../core/user.service';
import { UserModel } from '../core/user.model';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit, OnDestroy {
  currentTab: BehaviorSubject<string>;
  user: UserModel;
  userUpdates: UserModel;
  passwordsMatch: BehaviorSubject<boolean>;
  hasPassword: boolean;
  uploading: Observable<boolean>;
  showAvatarEdit = false;

  showPurchaseHistory = false;
  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
  ) {
    this.passwordsMatch = new BehaviorSubject(false);
    this.currentTab = new BehaviorSubject('account');
  }

  ngOnInit() {
    this.userUpdates = {};
    this.user = {};
    this.authService
      .getUserId()
      .pipe(
        map(uid => {
          this.userService
            .getUserById(uid)
            .valueChanges()
            .pipe(
              map(user => {
                this.user = user;
                this.userUpdates = user;
                this.hasPassword = !!user.password;
              }),
            )
            .subscribe();
        })
      )
      .subscribe();
    // this.currentTab.next('profile');
  }

  ngOnDestroy() {
    this.passwordsMatch.complete();
    this.currentTab.complete();
    console.log('destroyed account');
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

  updateUserData(loader, newData: any, key?: string) {
    if (newData) {
      loader.load();
      this.userService.updateUser(this.user.uid, newData);
    }
  }
}
