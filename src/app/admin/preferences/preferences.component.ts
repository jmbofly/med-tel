import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/admin/admin.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent implements OnInit {
  canEdit: boolean = false;
  preferences: any;

  constructor(private route: ActivatedRoute, private admin: AdminService, private cookieService: CookieService) { }


  ngOnInit(): void {
    const adminId = this.admin.getCookie('admin_id');
    this.admin.getAdminData(adminId)
      .valueChanges()
      .subscribe(data => {
        console.log(data)
        // this.preferences = data.preferences;
    })
    this.canEdit = this.route.snapshot.paramMap.get('action') === 'edit'
  }

}
