import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';
export interface Response {
  instructions?: string;
  subject?: string;
}
@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss'],
})
export class ThankYouComponent implements OnInit {
  @Input() content: Response = {
    instructions: `Please check your email,`,
    subject: `for more information regarding your purchase or inquiry.`,
  };
  constructor(private router: Router) {}

  ngOnInit() {}

  public navigateTo(url = '/') {
    return this.router.navigateByUrl(url);
  }
}
