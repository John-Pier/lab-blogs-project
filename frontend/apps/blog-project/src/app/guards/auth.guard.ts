import { Injectable } from '@angular/core';
import {
  Router,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  CanActivate,
  UrlTree,
  CanActivateChild,
} from '@angular/router';
import { BPRoute } from '../models';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private readonly authService: AuthService, private readonly router: Router) {}

  public canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): boolean | UrlTree {
    console.log('AuthGuard');
    if (this.authService.isAuthenticated()) {
      return true;
    }
    return this.router.createUrlTree([BPRoute.Auth]);
  }

  public canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    return this.canActivate(childRoute, state);
  }
}
