import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of, switchMap, tap } from 'rxjs';
import { BlogDto, BPRoute, BPRouteParam, PostPreviewDto } from '../../../../models';
import { MainApiService, UserProfileService } from '../../../../services';
import { BreadcrumbsService } from '../../services';

@Component({
  selector: 'bp-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.less'],
})
export class PostFormComponent implements OnInit {
  readonly blog$ = this.loadBlog$();
  readonly user = this.userProfileService.getUserProfile();

  constructor(
    private readonly mainApiService: MainApiService,
    private readonly userProfileService: UserProfileService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly breadcrumbsService: BreadcrumbsService
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
      }),
      catchError(() => {
        this.router.navigate(['/', BPRoute.NotFound]);
        return of(null);
      }),
      tap(blog => {
        if (blog) {
          this.breadcrumbsService.setNextItem(blog.name, ['/', BPRoute.Content, BPRoute.Blogs, blog.id]);
        }
      })
    );
  }

  trackByPostId(index: number, post: PostPreviewDto): string {
    return post.id;
  }

  public editBlog() {}

  public createPost() {}
}
