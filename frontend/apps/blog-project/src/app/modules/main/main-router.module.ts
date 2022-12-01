import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { BPRoute, BPRouteParam } from '../../models';
import { MainHeaderComponent } from '../header';
import { ArticlesComponent, BlogDetailsComponent, MainComponent } from './components';

const routes: Route[] = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: BPRoute.Profile,
        loadChildren: () => import('../profile').then(m => m.ProfileModule),
      },
      {
        path: BPRoute.Blogs,
        component: ArticlesComponent,
      },
      {
        path: `${BPRoute.Blogs}/:${BPRouteParam.BlogId}`,
        component: BlogDetailsComponent,
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: BPRoute.Blogs,
      },
    ],
  },
  {
    path: '',
    component: MainHeaderComponent,
    outlet: 'header-outlet',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRouterModule {}
