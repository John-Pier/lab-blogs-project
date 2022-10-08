import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { AppRouterModule } from './app-router.module';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { RegistrationComponent } from './components/registration/registration.component';

const COMPONENTS = [AppComponent, AuthenticationComponent, RegistrationComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [BrowserModule, RouterOutlet, AppRouterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
