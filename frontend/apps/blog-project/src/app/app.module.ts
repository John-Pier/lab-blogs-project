import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
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

@NgModule({
  declarations: [...COMPONENTS],
  imports: [BrowserModule, RouterOutlet, AppRouterModule],
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
