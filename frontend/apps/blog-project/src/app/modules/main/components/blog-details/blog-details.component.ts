import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tuiPure } from '@taiga-ui/cdk';
import { catchError, Observable, of, switchMap, tap } from 'rxjs';
import { BlogDto, BPRoute, BPRouteParam, PostPreviewDto } from '../../../../models';
import { MainApiService, UserProfileService } from '../../../../services';
import { BreadcrumbsService } from '../../services';

@Component({
  selector: 'bp-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.less'],
})
export class BlogDetailsComponent implements OnInit {
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

  @tuiPure
  canEdit(blog: BlogDto): boolean {
    if (!blog) {
      return false;
    }
    return this.userProfileService.isModeratorAccess() || this.user?.id === blog.createdBy?.id;
  }

  @tuiPure
  canCreate(blog: BlogDto): boolean {
    if (!blog) {
      return false;
    }
    return this.user?.id === blog.createdBy?.id;
  }

  trackByPostId(index: number, post: PostPreviewDto): string {
    return post.id;
  }

  public editBlog() {
    this.router.navigate([BPRoute.BlogEdit], {
      relativeTo: this.route,
    });
  }

  public createPost() {
    this.router.navigate([BPRoute.PostCreate], {
      relativeTo: this.route,
    });
  }
}
