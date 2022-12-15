import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { TuiButtonModule } from '@taiga-ui/core';
import { BlogFormComponent } from '../blog-form';
import { BlogEditComponent } from './components';

const routes: Route[] = [
  {
    path: '',
    component: BlogEditComponent,
  },
];

@NgModule({
  declarations: [BlogEditComponent],
  imports: [CommonModule, RouterModule.forChild(routes), TuiButtonModule, BlogFormComponent],
})
export class BlogEditModule {}
