import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-divider',
  templateUrl: './divider.component.html',
  styleUrls: ['./divider.component.scss'],
})
export class DividerComponent implements OnInit {
  @Input() content: { title: string; text: string; ctaLink: () => void };
  dividerContent: any;
  constructor() {}

  ngOnInit() {
    const content = this.content;
    this.dividerContent = {
      title: content.title,
      text: content.text,
      ctaLink: content.ctaLink,
    };
  }
}
