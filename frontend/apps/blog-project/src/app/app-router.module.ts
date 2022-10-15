import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegistrationComponent } from './components/registration/registration.component';

const routes: Route[] = [
  {
    path: 'blog',
    pathMatch: 'full',
    loadChildren: () => import('./modules/main').then(m => m.MainModule),
  },
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
    component: NotFoundComponent,
  },
  {
    path: '403',
    component: ForbiddenComponent,
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
