import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MainHeaderComponent } from '../header';
import { MainComponent } from './components';

const routes: Route[] = [
  {
    path: '',
    component: MainComponent,
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
