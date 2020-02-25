import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-brand-button',
  templateUrl: './brand-button.component.html',
  styleUrls: ['./brand-button.component.scss'],
})
export class BrandButtonComponent implements OnInit {
  @Input() logoHidden = false;
  @Input() height = '44px';
  @Input() width = '300px';
  @Input() primaryColor = '#007bff';
  @Input() secondaryColor?: string;
  @Input() showOnInit = true;
  widthIsFull: BehaviorSubject<boolean>;
  constructor(private router: Router) {
    this.widthIsFull = new BehaviorSubject(false);
  }

  ngOnInit() {
    const path = document.getElementById('logo-container');
    const classList = path.classList;
    this.widthIsFull.next(this.logoHidden);
    if (this.showOnInit) {
      setTimeout(this.animateSvg(path, classList), 0);
    } else {
      setTimeout(() => classList.add('fin'), 500);
    }
  }

  animateSvg(path: HTMLElement, classList: DOMTokenList) {
    return () => {
      setTimeout(() => classList.toggle('fin'), 0);
      setTimeout(() => classList.toggle('fin'), 1250);
    };
  }

  navigateTo(url) {
    this.router
      .navigateByUrl(url)
      .then(() => setTimeout(this.animateSvg, 1200));
  }
}
