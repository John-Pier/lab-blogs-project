import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { RegistrationComponent } from './components/registration/registration.component';

const routes: Route[] = [
  {
    path: 'auth',
    component: AuthenticationComponent,
  },
  {
    path: 'register',
    component: RegistrationComponent,
  },
  {
    path: '404',
    component: RegistrationComponent,
  },
  {
    path: '403',
    component: RegistrationComponent,
  },
  {
    path: '**',
    redirectTo: '/404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRouterModule {}
