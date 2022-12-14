import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { BlogEditComponent } from './components';

const routes: Route[] = [
  {
    path: '',
    component: BlogEditComponent,
  },
];

@NgModule({
  declarations: [BlogEditComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class BlogEditModule {}
