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
  widthIsFull: BehaviorSubject<boolean>;
  constructor(private router: Router) {
    this.widthIsFull = new BehaviorSubject(false);
  }

  ngOnInit() {
    this.widthIsFull.next(this.logoHidden);
    setTimeout(this.animateSvg, 1200);
  }

  animateSvg() {
    const path = document.getElementById('logo-container');
    const classList = path.classList;
    setTimeout(() => classList.toggle('fin'), 500);
    setTimeout(() => classList.toggle('fin'), 5000);
  }

  navigateTo(url) {
    this.router
      .navigateByUrl(url)
      .then(() => setTimeout(this.animateSvg, 1200));
  }
}
