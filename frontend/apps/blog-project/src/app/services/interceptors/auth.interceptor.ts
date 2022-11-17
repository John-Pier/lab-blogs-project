import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthTokenService } from '../auth-token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private readonly tokenService: AuthTokenService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.tokenService.getToken();
    const cloned = request.clone();
    if (token) {
      cloned.headers.set('Authorization', `Barer ${token}`);
    }
    return next.handle(cloned);
  }
}
