import { Component, OnInit } from '@angular/core';
import { tuiPure } from '@taiga-ui/cdk';
import { forkJoin, map, Observable, switchMap, tap } from 'rxjs';
import { BlogPreviewDto } from '../../../../models';
import { MainApiService } from '../../../../services';

@Component({
  selector: 'bp-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.less'],
})
export class ArticlesComponent implements OnInit {
  readonly blogs$: Observable<BlogPreviewDto[]> = this.mainApiService.loadBlogsPreview().pipe(
    switchMap(blogs => {
      const posts = blogs.map(({ id }) => (id && this.mainApiService.loadPostsPreview(id)) || null);
      return forkJoin(posts.filter(Boolean)).pipe(
        map(posts => {
          console.log(posts);
          return blogs;
        })
      );
    }),
    tap(v => {
      console.log(v);
    })
  );
  // readonly categories$ = this.mainApiService.loadCategories();

  constructor(private readonly mainApiService: MainApiService) {}

  ngOnInit(): void {}

  @tuiPure
  getBlogLink(blogId: string): string[] {
    return [blogId];
  }
}
