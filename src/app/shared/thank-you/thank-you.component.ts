import { Component, OnInit, OnDestroy, Input } from '@angular/core';

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
    instructions: `Please check your eamil`,
    subject: `getting more information regarding your inquery.`,
  };
  constructor() {}

  ngOnInit() {}
}
