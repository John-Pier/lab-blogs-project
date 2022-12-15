import { Component, OnInit } from '@angular/core';
import { tuiPure } from '@taiga-ui/cdk';
import { map, Observable } from 'rxjs';
import { BlogPreviewDto, BPRoute } from '../../../../models';
import { MainApiService } from '../../../../services';

@Component({
  selector: 'bp-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.less'],
})
export class ArticlesComponent implements OnInit {
  readonly createLink = [BPRoute.BlogCreate];
  readonly blogs$ = this.selectBlogsPreviews();

  constructor(private readonly mainApiService: MainApiService) {}

  ngOnInit(): void {}

  private selectBlogsPreviews(): Observable<BlogPreviewDto[]> {
    return this.mainApiService.loadBlogsPreview().pipe(
      map(blogs => {
        return blogs.sort((a, b) => {
          return -new Date(a.createdAt).getTime() + new Date(b.createdAt).getTime();
        });
      })
    );
  }

  @tuiPure
  getBlogLink(blogId: string): string[] {
    return [blogId];
  }
}
