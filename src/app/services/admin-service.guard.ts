import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminServiceGuard implements CanLoad, CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canLoad(route: Route, segments: UrlSegment[]): boolean {
    if (this.authService.currentUser?.isAdmin !== true) {
      window.alert(
        'You are not authorized to visit this page.Please contact your supervisor.'
      );
      // // Navigate to /home
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    if (this.authService.currentUser?.isAdmin) {
      return true;
    }

    window.alert(
      'You are not authorized to visit this page.Please contact your supervisor.'
    );
    this.router.navigate(['/home']);
    // this.router.navigate(['/login'], {
    //   queryParams: { returnUrl: state.url },
    // });
    return false;
  }
}
