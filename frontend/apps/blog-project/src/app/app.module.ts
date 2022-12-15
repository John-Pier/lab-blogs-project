import { registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import localeRu from '@angular/common/locales/ru';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterOutlet } from '@angular/router';
import {
  TUI_SANITIZER,
  TuiAlertModule,
  TuiButtonModule,
  TuiDialogModule,
  TuiErrorModule,
  TuiLinkModule,
  TuiRootModule,
} from '@taiga-ui/core';
import { TUI_LANGUAGE, TUI_RUSSIAN_LANGUAGE } from '@taiga-ui/i18n';
import {
  TuiFieldErrorPipeModule,
  TuiInputDateModule,
  TuiInputModule,
  TuiInputPasswordModule,
  TuiMarkerIconModule,
} from '@taiga-ui/kit';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { of } from 'rxjs';
import { environment } from '../environments/environment';
import { AppRouterModule } from './app-router.module';
import { AppComponent } from './app.component';
import { BP_APP_API_CONFIG, BP_CONTACTS_DATA_CONFIG, contactsDataConfig } from './app.config';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AuthInterceptor, AuthTokenApiService, ErrorHandlerInterceptor, MainApiService } from './services';

const COMPONENTS = [
  AppComponent,
  AuthenticationComponent,
  RegistrationComponent,
  NotFoundComponent,
  ForbiddenComponent,
];
const PIPES = [];

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
    TuiMarkerIconModule,
    TuiLinkModule,
  ],
  providers: [
    AuthTokenApiService,
    MainApiService,
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
      provide: TUI_SANITIZER,
      useClass: NgDompurifySanitizer,
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
  exports: [],
})
export class AppModule {}
