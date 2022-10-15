import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from '../environments/environment';
import { AppRouterModule } from './app-router.module';
import { AppComponent } from './app.component';
import { BP_APP_API_CONFIG, BP_CONTACTS_DATA_CONFIG, contactsDataConfig } from './app.config';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegistrationComponent } from './components/registration/registration.component';

const COMPONENTS = [
  AppComponent,
  AuthenticationComponent,
  RegistrationComponent,
  NotFoundComponent,
  ForbiddenComponent,
];

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    BrowserModule,
    RouterOutlet,
    AppRouterModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        skipWhenExpired: true,
      },
    }),
  ],
  providers: [
    {
      provide: BP_APP_API_CONFIG,
      useValue: environment.config,
    },
    {
      provide: BP_CONTACTS_DATA_CONFIG,
      useValue: contactsDataConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
