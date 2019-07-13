import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'safeHtml',
})
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitized: DomSanitizer) {}
  transform(value) {
    // console.log('transform value from tab', value);
    this.sanitized.bypassSecurityTrustStyle(value);
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}

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
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

  navigateTo(url: string) {
    this.router.navigateByUrl(url, { relativeTo: this.route });
  }

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
      imageURL: content.imageURL,
      text: content.text,
      ctaLink: content.ctaLink,
    };
  }
}
