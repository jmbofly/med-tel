import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-brand-button',
  templateUrl: './brand-button.component.html',
  styleUrls: ['./brand-button.component.scss'],
})
export class BrandButtonComponent implements OnInit {
  @Input() height = '44px';
  @Input() width = '300px';
  constructor(private router: Router) {}

  ngOnInit() {
    this.animateSvg();
  }

  animateSvg(timeout = 1250, action: 'add' | 'remove' = 'add') {
    const path = document.querySelector('.svg-container');

    const classList = path.classList;

    const add = () => {
      classList.add('fin');
    };

    const remove = () => {
      classList.remove('fin');
    };

    const func = (act: 'add' | 'remove') => {
      return act === 'add' ? remove : add;
    };

    return setTimeout(func(action), timeout);
  }

  navigateTo(url) {
    this.router.navigateByUrl(url).then(() => this.animateSvg(null, 'remove'));
  }
}
