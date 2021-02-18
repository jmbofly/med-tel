import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from '../admin/services/admin.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService, private admin: AdminService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.admin.checkCookie('admin_id')) {
      const adminId = this.admin.getCookie('admin_id');
      this.router.navigateByUrl(`admin/${adminId}`);
    }
  }

  login(email: string, password: string) {
    return this.auth.loginWithEmail(email, password)
      .then((res: any) => {
          this.admin.setCookie(res.user.uid)
          this.router.navigateByUrl(`admin/${res.user.uid}`)
        console.log('auth response',res)
      })
      .catch(err => {
        console.log(err)
      })
  }

}
