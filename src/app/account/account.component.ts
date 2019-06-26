import { Component, OnInit } from '@angular/core';
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
  userUpdates: UserModel = {};
  passwordsMatch: BehaviorSubject<boolean>;
  constructor(
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
    const match = current !== input;
    console.log('no match', match, input);
    this.passwordsMatch.next(match);
  }

  ngOnInit() {
    this.authService
      .loggedIn()
      .pipe(
        map(user => {
          this.userService
            .getUserById(user.uid)
            .valueChanges()
            .pipe(
              map(u => {
                console.log(u);
                this.user = u;
                this.userUpdates = u;
              })
            )
            .subscribe();
        })
      )
      .subscribe();
    // this.currentTab.next('profile');
  }

  toggleTab(tab: string) {
    this.currentTab.next(tab);
  }

  updateUserData(el: HTMLElement, newData: any) {
    console.log('updating settings', el, newData);
    return this.userService.updateUser(this.user.uid, newData);
  }
}
