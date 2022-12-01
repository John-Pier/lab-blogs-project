import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { BlogDto, BPRoute, BPRouteParam } from '../../../../models';
import { MainApiService } from '../../../../services';

@Component({
  selector: 'bp-posts-preview',
  templateUrl: './posts-preview.component.html',
  styleUrls: ['./posts-preview.component.less'],
})
export class PostsPreviewComponent implements OnInit {
  readonly blog$ = this.loadBlog$();

  constructor(
    private readonly mainApiService: MainApiService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  private loadBlog$(): Observable<BlogDto | null> {
    return this.route.paramMap.pipe(
      switchMap(params => {
        const blogId = params.get(BPRouteParam.BlogId);
        if (!blogId) {
          this.router.navigate(['/', BPRoute.NotFound]);
          return of(null);
        }
        return this.mainApiService.loadBlog(blogId);
      })
    );
  }
}
