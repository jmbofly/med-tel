import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ParallaxConfig } from 'ngx-parallax';
@Component({
  selector: 'app-divider',
  templateUrl: './divider.component.html',
  styleUrls: ['./divider.component.scss'],
})
export class DividerComponent implements OnInit {
  @Input() content: any;
  // @Input() gradientColors?: () => any;
  dividerContent: any = {};
  dividerColors: any = {};
  parallaxConfig: ParallaxConfig;
  constructor(private router: Router, private route: ActivatedRoute) {}

  navigateTo(url: string) {
    this.router.navigateByUrl(url, { relativeTo: this.route });
  }

  ngOnInit() {
    this.parallaxConfig = {
      maxValue: 0,
      initialValue: -250, ratio: .25, 
    };
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
      imageURL: content.imageURL,
      text: content.text,
      ctaLink: content.ctaLink,
    };
  }
}
