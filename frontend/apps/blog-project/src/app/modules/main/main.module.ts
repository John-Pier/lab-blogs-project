import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TuiEditorSocketModule } from '@taiga-ui/addon-editor';
import { TuiForModule } from '@taiga-ui/cdk';
import { TuiButtonModule, TuiExpandModule, TuiLinkModule, TuiLoaderModule } from '@taiga-ui/core';
import { TuiBreadcrumbsModule, TuiIslandModule } from '@taiga-ui/kit';
import { CategoriesNamesPipeModule, FullNamePipeModule } from '../../pipes';
import { HeaderModule } from '../header';
import { ArticlesComponent, BlogDetailsComponent, MainComponent, PostsPreviewComponent } from './components';
import { CommentComponent } from './components/comment';
import { PostDetailsComponent } from './components/post-details';
import { MainRouterModule } from './main-router.module';

@NgModule({
  declarations: [MainComponent, ArticlesComponent, PostsPreviewComponent, PostDetailsComponent, CommentComponent, BlogDetailsComponent],
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
    TuiEditorSocketModule,
    TuiForModule,
    CategoriesNamesPipeModule,
  ],
})
export class MainModule {}
