import { Component, OnInit, TemplateRef } from '@angular/core';
import { ToastService } from '../core/toast.service';

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.scss'],
})
export class ToastsComponent implements OnInit {
  constructor(public toastService: ToastService) {}

  ngOnInit() {}

  isTemplate(toast) {
    return toast.textOrTpl instanceof TemplateRef;
  }
}
