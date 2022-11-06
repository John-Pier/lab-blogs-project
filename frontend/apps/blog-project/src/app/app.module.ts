import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterOutlet } from '@angular/router';
import { TuiAlertModule, TuiButtonModule, TuiDialogModule, TuiErrorModule, TuiRootModule } from '@taiga-ui/core';
import { TuiFieldErrorPipeModule, TuiInputDateModule, TuiInputModule, TuiInputPasswordModule } from '@taiga-ui/kit';
import { environment } from '../environments/environment';
import { AppRouterModule } from './app-router.module';
import { AppComponent } from './app.component';
import { BP_APP_API_CONFIG, BP_CONTACTS_DATA_CONFIG, contactsDataConfig } from './app.config';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { TokenApiService } from './services';

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
    HttpClientModule,
    BrowserAnimationsModule,
    RouterOutlet,
    AppRouterModule,
    TuiRootModule,
    TuiAlertModule,
    TuiDialogModule,
    // JwtModule.forRoot({
    //   config: {
    //     tokenGetter: tokenGetter,
    //     skipWhenExpired: true,
    //   },
    // }),
    TuiInputModule,
    ReactiveFormsModule,
    TuiButtonModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiInputPasswordModule,
    TuiInputDateModule,
  ],
  providers: [
    TokenApiService,
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
