import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { API_PATH, UserAuthDto, UserProfileDto, UserProfileWithToken, UserWithCredentialsDto } from '../../models';
import { AuthTokenService } from '../auth-token.service';

@Injectable()
export class AuthTokenApiService {
  private authPath = '/auth';
  private logoutPath = '/logout';
  private registrationPath = '/register';

  constructor(private readonly httpClient: HttpClient, private readonly tokenService: AuthTokenService) {}

  authenticate$(authModel: UserAuthDto): Observable<UserProfileDto> {
    return this.httpClient.post<UserProfileWithToken>(API_PATH + this.authPath, authModel).pipe(
      map(body => {
        this.tokenService.setAuth(body.token);
        return body;
      })
    );
  }

  logout$(): Observable<unknown> {
    this.tokenService.clear();
    return this.httpClient.post<void>(API_PATH + this.logoutPath, {}).pipe(
      catchError(() => {
        return of(true);
      })
    );
  }

  register$(model: UserWithCredentialsDto): Observable<UserProfileDto> {
    return this.httpClient.post<UserProfileDto>(API_PATH + this.registrationPath, model);
  }
}
