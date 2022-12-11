import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, EMPTY, Observable, tap, throwError } from 'rxjs';
import { BPRoute, UserProfileDto } from '../models';
import { MainApiService } from './api';
import { AuthTokenService } from './auth-token.service';
import { UserProfileService } from './user-profile.service';

@Injectable()
export class UserResolver implements Resolve<UserProfileDto> {
  constructor(
    private readonly mainApiService: MainApiService,
    private readonly userProfileService: UserProfileService,
    private readonly tokenService: AuthTokenService,
    private readonly router: Router
  ) {}
  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserProfileDto> {
    const login = this.userProfileService.getUserProfile()?.login;
    if (!login) {
      this.clear();
      return EMPTY;
    }
    return this.mainApiService.loadUser(login).pipe(
      tap(user => {
        this.userProfileService.setUserProfile(user);
      }),
      catchError(e => {
        this.clear();
        this.router.navigate([BPRoute.Root, BPRoute.Auth]);
        return throwError(() => new Error('Ошибка на стороне сервера: ' + e.message));
      })
    );
  }

  private clear() {
    this.tokenService.clear();
    this.userProfileService.clearUserProfile();
  }
}
