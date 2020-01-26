import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  // @Input() loading: Observable<boolean>;
  loading: Observable<boolean>;
  constructor(public router: Router, public route: ActivatedRoute) {}

  load(routerConfig: { url: string; params: Params } = null) {
    this.loading = new Observable(obs => {
      obs.next(true);
      if (routerConfig) {
        setTimeout(() => {
          this.router
            .navigate([routerConfig.url], {
              relativeTo: this.route,
              ...routerConfig.params,
            })
            .then(() => {
              window.scrollTo(0, 0);
            });
          obs.next(false);
        }, 1000);
      } else {
        setTimeout(() => {
          obs.next(false);
        }, 1000);
      }
    });
    window.scrollTo(0, 0);
    return false;
  }

  ngOnInit() {}
}
