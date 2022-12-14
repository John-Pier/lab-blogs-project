import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { TuiButtonModule } from '@taiga-ui/core';
import { PostFormModule } from '../post-form';
import { PostCreateComponent } from './component';

const routes: Route[] = [
  {
    path: '',
    component: PostCreateComponent,
  },
];

@NgModule({
  declarations: [PostCreateComponent],
  imports: [CommonModule, RouterModule.forChild(routes), PostFormModule, TuiButtonModule],
})
export class PostCreateModule {}
