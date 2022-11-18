import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { BPRoute } from '../../models';
import { MainHeaderComponent } from '../header';
import { ArticlesComponent, MainComponent } from './components';

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
        path: '',
        component: ArticlesComponent,
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
