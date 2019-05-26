import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-divider',
  templateUrl: './divider.component.html',
  styleUrls: ['./divider.component.scss'],
})
export class DividerComponent implements OnInit {
  @Input() content: any;
  dividerContent: any;
  dividerColors: any;
  constructor() {}

  ngOnInit() {
    const content = this.content;
    const contentColors = content.colors;
    this.dividerColors = {
      bgColor: contentColors.bgColor,
      title: contentColors.title,
      text: contentColors.text,
      cta: contentColors.cta,
    };
    this.dividerContent = {
      title: content.title,
      icon: content.icon,
      text: content.text,
      ctaLink: content.ctaLink,
    };
  }
}
