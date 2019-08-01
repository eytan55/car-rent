import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(private authService: AuthService, private router: Router) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
    ): Observable<boolean> | Promise<boolean> | boolean {

      console.log('canLoad userIsAuthenticated: ', this.authService.userIsAuthenticated);
      console.log('this.authService.userIsAuthenticated.pipe(take(1): ', this.authService.userIsAuthenticated.pipe(take(1)));
      return this.authService.userIsAuthenticated.pipe(take(1), tap(isAuthenticated => {
        console.log('isAuthenticated: ', isAuthenticated);
        if (!isAuthenticated)  {
          console.log('canLoad !userIsAuthenticated: ', this.authService.userIsAuthenticated);
          this.router.navigateByUrl('/auth');
        }
      }));
  }
}
