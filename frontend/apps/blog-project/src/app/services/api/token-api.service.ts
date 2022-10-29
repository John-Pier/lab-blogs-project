import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_PATH, UserAuthDto, UserProfileDto, UserWithCredentialsDto } from '../../models';

@Injectable()
export class TokenApiService {
  private authPath = '/auth';
  private logoutPath = '/logout';
  private registrationPath = '/register';

  constructor(private readonly httpClient: HttpClient) {}

  authenticate$(authModel: UserAuthDto): Observable<UserProfileDto> {
    return this.httpClient.post<UserProfileDto>(API_PATH + this.authPath, authModel);
  }

  logout$() {
    return this.httpClient.post<void>(API_PATH + this.logoutPath, {});
  }

  register$(model: UserWithCredentialsDto) {
    return this.httpClient.post<UserProfileDto>(API_PATH + this.registrationPath, model);
  }
}
