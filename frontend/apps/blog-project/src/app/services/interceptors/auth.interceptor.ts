import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpResponseBase,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { BPRoute } from '../../models';
import { AuthTokenService } from '../auth-token.service';

export const AUTH_TOKEN_HEADER = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private readonly tokenService: AuthTokenService, private readonly router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.tokenService.getToken();
    let cloned = request;
    if (token) {
      cloned = cloned.clone({ headers: new HttpHeaders({ [AUTH_TOKEN_HEADER]: token }) });
    }
    return next.handle(cloned).pipe(
      catchError((error: HttpResponseBase) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            this.tokenService.clear();
            this.router.navigate([BPRoute.Root, BPRoute.Auth]);
          }
        }
        return throwError(() => error);
      })
    );
  }
}
