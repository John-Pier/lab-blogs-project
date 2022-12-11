import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TuiEditorSocketModule } from '@taiga-ui/addon-editor';
import { TuiForModule } from '@taiga-ui/cdk';
import { TuiButtonModule, TuiExpandModule, TuiLinkModule, TuiLoaderModule } from '@taiga-ui/core';
import { TuiBreadcrumbsModule, TuiIslandModule } from '@taiga-ui/kit';
import { CategoriesNamesPipe, FullNamePipe } from '../../pipes';
import { HeaderModule } from '../header';
import {
  ArticlesComponent,
  BlogDetailsComponent,
  MainComponent,
  PostFormComponent,
  PostsPreviewComponent,
} from './components';
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
    PostFormComponent,
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
  ],
})
export class MainModule {}
