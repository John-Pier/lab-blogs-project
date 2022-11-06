import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  isAuthenticated(): boolean {
    // try {
    //   const token = this.jwtHelperService.tokenGetter();
    //   if (!token || this.jwtHelperService.isTokenExpired(token)) {
    //     this.clear();
    //     return false;
    //   }
    //   const decoded = this.jwtHelperService.decodeToken(token);
    //   return Object.keys(decoded).length > 0;
    // } catch {
    //   return false;
    // }

    return false;
  }

  clear() {
    localStorage.removeItem('access_token');
  }
}
