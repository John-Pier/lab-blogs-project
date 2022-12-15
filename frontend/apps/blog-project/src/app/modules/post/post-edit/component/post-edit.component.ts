import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';
import { BehaviorSubject, EMPTY, finalize, first, switchMap, tap } from 'rxjs';
import { BPRoute, BPRouteParam, PostDto } from '../../../../models';
import { MainApiService } from '../../../../services';
import { PostFormModel } from '../../post-form';

@Component({
  selector: 'bp-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.less'],
  providers: [TuiDestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostEditComponent implements OnInit {
  readonly formGroup = this.buildForm();
  readonly isLoading$ = new BehaviorSubject<boolean>(true);

  private post: PostDto | undefined;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly alertService: TuiAlertService,
    private readonly mainApiService: MainApiService
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap(paramMap => {
          const postId = paramMap.get(BPRouteParam.PostsId);
          if (!postId) {
            this.navigateToNotFound();
            return EMPTY;
          }
          return this.mainApiService.loadPost(postId);
        }),
        first(),
        tap(post => {
          if (!post) {
            this.navigateToNotFound();
          }
          this.post = post;
          this.pathForm(post);
        }),
        finalize(() => {
          this.isLoading$.next(false);
        })
      )
      .subscribe();
  }

  private navigateToNotFound() {
    this.router.navigate([BPRoute.Root, BPRoute.NotFound]);
  }

  private pathForm(post: PostDto) {
    this.formGroup.patchValue({
      description: post.description,
      label: post.label,
      content: post.content,
      preview: post.preview,
    });
    this.formGroup.markAsPristine();
  }

  private buildForm(): FormGroup<PostFormModel> {
    return this.formBuilder.group({
      label: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(200)]],
      preview: [''],
      content: ['', [Validators.required, Validators.minLength(200)]],
    });
  }

  public invalidateForm() {}

  public submitForm() {
    const modelValue = this.formGroup.value;
    const model: Partial<PostDto> = {
      id: this.post?.id,
      userId: this.post?.userId,
      blogId: this.post?.blogId,
      label: modelValue.label!,
      content: modelValue.content!,
      preview: modelValue.preview || undefined,
      description: modelValue.description!,
    };

    this.isLoading$.next(true);
    this.mainApiService
      .updatePost(model, this.post?.id!)
      .pipe(
        switchMap(post => {
          this.alertService
            .open('', {
              label: 'Изменения сохранены!',
              autoClose: 5500,
              status: TuiNotification.Success,
            })
            .subscribe();

          return this.navigateOnPost(post.id);
        }),
        finalize(() => {
          this.isLoading$.next(false);
        })
      )
      .subscribe();
  }

  private navigateOnPost(postId: string): Promise<unknown> {
    return this.router.navigate([BPRoute.Root, BPRoute.Content, BPRoute.Posts, postId]);
  }

  cancelClick() {
    this.router.navigate(['../'], {
      relativeTo: this.route,
    });
  }
}
