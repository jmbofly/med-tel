import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { AdminService } from '../services/admin.service';
import { Buyer } from './templates/buyer';
import { Order } from './templates/order';
import { Seller } from './templates/seller';
@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
})
export class FormsComponent implements OnInit {
  @Input() isPage = true;
  @Input() type?: string;
  constructor(private adminService: AdminService, private fb: FormBuilder) { }

  ngOnInit(): void {
    console.log('Form Type -> type', this.type)
    if (!this.isPage) {
    console.log("FormsComponent -> ngOnInit -> isPage", this.isPage)

    }
  }

}
