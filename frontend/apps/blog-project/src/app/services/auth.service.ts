import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly jwtHelperService: JwtHelperService) {}

  isAuthenticated(): boolean {
    try {
      const token = this.jwtHelperService.tokenGetter();
      if (!token || this.jwtHelperService.isTokenExpired(token)) {
        this.clear();
        return false;
      }
      const decoded = this.jwtHelperService.decodeToken(token);
      return Object.keys(decoded).length > 0;
    } catch {
      return false;
    }
  }

  clear() {
    localStorage.removeItem('access_token');
  }
}
