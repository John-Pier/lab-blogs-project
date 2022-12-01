import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TuiButtonModule, TuiExpandModule, TuiLinkModule, TuiLoaderModule } from '@taiga-ui/core';
import { TuiBreadcrumbsModule, TuiIslandModule } from '@taiga-ui/kit';
import { FullNamePipeModule } from '../../pipes';
import { HeaderModule } from '../header';
import { ArticlesComponent, BlogDetailsComponent, MainComponent, PostsPreviewComponent } from './components';
import { MainRouterModule } from './main-router.module';

@NgModule({
  declarations: [MainComponent, ArticlesComponent, PostsPreviewComponent, BlogDetailsComponent],
  imports: [
    CommonModule,
    MainRouterModule,
    HeaderModule,
    TuiBreadcrumbsModule,
    TuiLinkModule,
    TuiIslandModule,
    FullNamePipeModule,
    TuiLoaderModule,
    TuiExpandModule,
    TuiButtonModule,
  ],
})
export class MainModule {}
