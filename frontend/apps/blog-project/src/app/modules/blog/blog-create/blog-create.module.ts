import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { TuiButtonModule } from '@taiga-ui/core';
import { BlogFormComponent } from '../blog-form';
import { BlogCreateComponent } from './components';

const routes: Route[] = [
  {
    path: '',
    component: BlogCreateComponent,
  },
];

@NgModule({
  declarations: [BlogCreateComponent],
  imports: [CommonModule, RouterModule.forChild(routes), BlogFormComponent, TuiButtonModule],
})
export class BlogCreateModule {}
