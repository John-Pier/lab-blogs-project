import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TuiLinkModule } from '@taiga-ui/core';
import { TuiBreadcrumbsModule } from '@taiga-ui/kit';
import { HeaderModule } from '../header';
import { MainComponent } from './components';
import { ArticlesComponent } from './components/articles/articles.component';
import { MainRouterModule } from './main-router.module';

@NgModule({
  declarations: [MainComponent, ArticlesComponent],
  imports: [CommonModule, MainRouterModule, HeaderModule, TuiBreadcrumbsModule, TuiLinkModule],
})
export class MainModule {}
