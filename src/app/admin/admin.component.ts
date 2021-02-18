import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { AuthService } from '../core/auth.service';
import { AdminService } from './services/admin.service';
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
  startDate?: string | Date;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
export class AdminComponent implements OnInit {
  admin: AdminConfig = {};
  user: User = {};
  preferences: any;
  showSettingsMenu = false;
  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService, private adminService: AdminService) { }

  initConfig(id) {
    this.adminService.getAdminData(id)
      .valueChanges()
      .subscribe(user => {
        this.user = user;
        this.user.startDate = new Date();
        // this.preferences = user.preferences;
      })
  }

  getPreferences(action: 'edit' | 'read' = 'read') {
    this.router.navigate(['preferences', action], {relativeTo: this.route})
  }

  toggleSettingsMenu() {
    this.showSettingsMenu = !this.showSettingsMenu;
  }

  navigateTo(url: string, param?: string) {
    if (param) {
      this.router.navigate([url,param], {relativeTo: this.route})
    } else {
      this.router.navigate([url], {relativeTo: this.route});
    }
  }

  signOut() {
    this.adminService.deleteCookie('admin_id');
    this.authService.signOut()
      .then(res => {
        this.router.navigateByUrl('login');
      })
      .catch(err => console.log(err))
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
