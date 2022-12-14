import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { PostEditComponent } from './component';

const routes: Route[] = [
  {
    path: '',
    component: PostEditComponent,
  },
];

@NgModule({
  declarations: [PostEditComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class PostEditModule {}
