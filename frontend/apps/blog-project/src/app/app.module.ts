import { registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import localeRu from '@angular/common/locales/ru';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterOutlet } from '@angular/router';
import { TuiAlertModule, TuiButtonModule, TuiDialogModule, TuiErrorModule, TuiRootModule } from '@taiga-ui/core';
import { TUI_LANGUAGE, TUI_RUSSIAN_LANGUAGE } from '@taiga-ui/i18n';
import { TuiFieldErrorPipeModule, TuiInputDateModule, TuiInputModule, TuiInputPasswordModule } from '@taiga-ui/kit';
import { of } from 'rxjs';
import { environment } from '../environments/environment';
import { AppRouterModule } from './app-router.module';
import { AppComponent } from './app.component';
import { BP_APP_API_CONFIG, BP_CONTACTS_DATA_CONFIG, contactsDataConfig } from './app.config';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AuthInterceptor, AuthTokenApiService, ErrorHandlerInterceptor } from './services';

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

registerLocaleData(localeRu, 'ru');

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
    TuiInputModule,
    ReactiveFormsModule,
    TuiButtonModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiInputPasswordModule,
    TuiInputDateModule,
  ],
  providers: [
    AuthTokenApiService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true,
    },
    {
      provide: TUI_LANGUAGE,
      useValue: of(TUI_RUSSIAN_LANGUAGE),
    },
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
