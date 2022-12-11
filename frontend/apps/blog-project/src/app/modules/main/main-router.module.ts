import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { BPRoute, BPRouteParam } from '../../models';
import { UserResolver } from '../../services';
import { MainHeaderComponent } from '../header';
import { ArticlesComponent, BlogDetailsComponent, MainComponent } from './components';
import { PostDetailsComponent } from './components/post-details';

const routes: Route[] = [
  {
    path: '',
    component: MainComponent,
    resolve: {
      user: UserResolver,
    },
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
        path: `${BPRoute.Posts}/:${BPRouteParam.PostsId}`,
        component: PostDetailsComponent,
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
  providers: [UserResolver],
})
export class MainRouterModule {}
