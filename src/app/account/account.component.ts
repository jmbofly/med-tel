import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { AuthService } from '../core/auth.service';
import { UserService } from '../core/user.service';
import { UserModel } from '../core/user.model';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  currentTab: BehaviorSubject<string>;
  user: UserModel;
  userUpdates: UserModel;
  passwordsMatch: BehaviorSubject<boolean>;
  hasPassword: boolean;
  uploading: Observable<boolean>;
  showAvatarEdit = false;
  constructor(
    public router: Router,
    public userService: UserService,
    public authService: AuthService
  ) {
    this.passwordsMatch = new BehaviorSubject(false);
    this.currentTab = new BehaviorSubject('account');
  }

  addedChanges(key: string, changes: UserModel, mergeTo: UserModel) {
    // console.log('merge', changes, mergeTo);
  }

  mergeChanges(field: string, newValue: UserModel, updated) {
    updated[field] = newValue;
    this.addedChanges(field, newValue, updated);
  }

  checkAgainstCurrentPassword(input, current) {
    const match = current === input;
    this.passwordsMatch.next(match);
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
              })
            )
            .subscribe();
        })
      )
      .subscribe();
    // this.currentTab.next('profile');
  }

  editAvatar() {
    this.showAvatarEdit = !this.showAvatarEdit;
  }

  toggleTab(tab: string) {
    this.currentTab.next(tab);
  }

  updateUserData(loader, newData: any) {
    if (newData) {
      loader.load();
      this.userService.updateUser(this.user.uid, newData);
    }
  }
}
