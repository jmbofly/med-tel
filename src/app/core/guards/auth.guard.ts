import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const url: string = state.url;
    return this.checkLogin(url);
  }

  checkLogin(url: string): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.loggedIn().pipe(
      take(1),
      tap(loggedIn => {
        if (!loggedIn) {
          // console.log(`ACCESS DENIED: ${url} ===> Logged In?`, loggedIn);
          this.router.navigateByUrl('/');
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
