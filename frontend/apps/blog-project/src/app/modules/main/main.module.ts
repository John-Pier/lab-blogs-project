import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TuiEditorSocketModule } from '@taiga-ui/addon-editor';
import { TuiForModule } from '@taiga-ui/cdk';
import { TuiButtonModule, TuiExpandModule, TuiLinkModule, TuiLoaderModule } from '@taiga-ui/core';
import { TuiBreadcrumbsModule, TuiIslandModule, TuiTagModule } from '@taiga-ui/kit';
import { CategoriesNamesPipe, FullNamePipe } from '../../pipes';
import { HeaderModule } from '../header';
import { ArticlesComponent, BlogDetailsComponent, MainComponent, PostsPreviewComponent } from './components';
import { CommentComponent } from './components/comment';
import { PostDetailsComponent } from './components/post-details';
import { MainRouterModule } from './main-router.module';

@NgModule({
  declarations: [
    MainComponent,
    ArticlesComponent,
    PostsPreviewComponent,
    PostDetailsComponent,
    CommentComponent,
    BlogDetailsComponent,
  ],
  imports: [
    CommonModule,
    MainRouterModule,
    HeaderModule,
    TuiBreadcrumbsModule,
    TuiLinkModule,
    TuiIslandModule,
    FullNamePipe,
    TuiLoaderModule,
    TuiExpandModule,
    TuiButtonModule,
    TuiEditorSocketModule,
    TuiForModule,
    CategoriesNamesPipe,
    TuiTagModule,
  ],
})
export class MainModule {}
