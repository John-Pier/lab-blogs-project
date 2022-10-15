import { NgModule } from '@angular/core';
import { PreloadAllModules, Route, RouterModule } from '@angular/router';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AuthGuard } from './guards/auth.guard';
import { BPRoute } from './models';

const routes: Route[] = [
  {
    path: BPRoute.Content,
    pathMatch: 'full',
    loadChildren: () => import('./modules/main').then(m => m.MainModule),
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: BPRoute.Content,
  },
  {
    path: BPRoute.Auth,
    component: AuthenticationComponent,
  },
  {
    path: BPRoute.Register,
    component: RegistrationComponent,
  },
  {
    path: BPRoute.NotFound,
    component: NotFoundComponent,
  },
  {
    path: BPRoute.Forbidden,
    component: ForbiddenComponent,
  },
  {
    path: '**',
    redirectTo: '/404',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRouterModule {}
