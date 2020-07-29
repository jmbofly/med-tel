import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { AdminService } from './admin.service';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { extend } from 'jquery';
import { ADMIN_DEFAULTS } from './defaults';

export interface AdminConfig {
  id?: string;
  docs?: any;
}

export interface User {
  firstName?: string;
  lastName?: string;
  preferences?: any;
  profileImg?: string;
  roles?: any[];
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  admin: AdminConfig = {};
  user: User = {};
  preferences: any;
  constructor(private router: Router, private route: ActivatedRoute, private auth: AuthService, private adminService: AdminService) { }

  initConfig(id) {
    this.adminService.getAdminData(id)
      .valueChanges()
      .subscribe(user => {
        this.user = user;
        // this.preferences = user.preferences;
      })
  }

  getPreferences(action: 'edit' | 'read' = 'read') {
    this.router.navigate(['preferences', action])
  }

  signOut() {
    return this.auth.signOut().then(res => this.router.navigateByUrl('login'))
  }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(switchMap(params => params.getAll('id')))
      .subscribe(id => {
        console.log(id)
        this.initConfig(id)
        setTimeout(() => {
        }, 10)
      });
  }

}
