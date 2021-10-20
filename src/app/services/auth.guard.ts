import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Injectable } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    if (!this.authService.currentUser?.name) {
      window.alert('You need log in.');
      // // Navigate to /login?returnUrl=xxxxx
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: state.url },
      });
      return false;
    }

    if (
      this.authService.currentUser?.name &&
      this.authService.currentUser?.isSalesperson === false
    ) {
      window.alert(
        'You are not authorized to visit this page.Please contact your supervisor.'
      );
      // // Navigate to /home
      this.router.navigate(['/home']);
      return false;
    }

    return true;
  }
}
