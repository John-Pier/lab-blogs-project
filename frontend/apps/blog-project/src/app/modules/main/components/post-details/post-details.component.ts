import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tuiPure } from '@taiga-ui/cdk';
import { catchError, Observable, of, switchMap, tap } from 'rxjs';
import { BPRoute, BPRouteParam, CommentDto, PostDto } from '../../../../models';
import { MainApiService, UserProfileService } from '../../../../services';
import { BreadcrumbsService } from '../../services';

@Component({
  selector: 'bp-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.less'],
})
export class PostDetailsComponent implements OnInit {
  readonly post$ = this.loadPost$();
  readonly comments$ = this.loadComment$();

  constructor(
    private readonly mainApiService: MainApiService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly userProfileService: UserProfileService,
    private readonly breadcrumbsService: BreadcrumbsService
  ) {}

  ngOnInit(): void {}

  private loadPost$(): Observable<PostDto | null> {
    return this.route.paramMap.pipe(
      switchMap(params => {
        const postId = params.get(BPRouteParam.PostsId);
        if (!postId) {
          this.router.navigate(['/', BPRoute.NotFound]);
          return of(null);
        }
        return this.mainApiService.loadPost(postId);
      }),
      catchError(() => {
        this.router.navigate(['/', BPRoute.NotFound]);
        return of(null);
      }),
      tap(post => {
        if (post) {
          this.breadcrumbsService.setNextItem(post.label, ['/', BPRoute.Content, BPRoute.Posts, post.id]);
        }
      })
    );
  }

  private loadComment$(): Observable<CommentDto[]> {
    return this.route.paramMap.pipe(
      switchMap(params => {
        const postId = params.get(BPRouteParam.PostsId);
        if (!postId) {
          return of([]);
        }
        return this.mainApiService.loadComments(postId);
      }),
      catchError(() => {
        return of([]);
      })
    );
  }

  trackByCommentId(index: number, commentDto: CommentDto): string {
    return commentDto.id;
  }

  @tuiPure
  public canEdit(post: PostDto) {
    if (!post) {
      return false;
    }
    const user = this.userProfileService.getUserProfile();
    return user?.id === post.user.id || this.userProfileService.isModeratorAccess();
  }

  public editPost() {
    this.router.navigate([BPRoute.PostEdit], {
      relativeTo: this.route,
    });
  }
}
