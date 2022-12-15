import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';
import { BehaviorSubject, finalize, first, switchMap, tap } from 'rxjs';
import { BPRoute, BPRouteParam, PostDto } from '../../../../models';
import { MainApiService } from '../../../../services';
import { PostFormModel } from '../../post-form';

@Component({
  selector: 'bp-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.less'],
  providers: [TuiDestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostCreateComponent implements OnInit {
  readonly formGroup = this.buildForm();
  readonly isLoading$ = new BehaviorSubject<boolean>(false);

  private blogId: string | null | undefined;

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
        tap(paramMap => {
          this.blogId = paramMap.get(BPRouteParam.BlogId);
        }),
        first()
      )
      .subscribe();
  }

  private buildForm(): FormGroup<PostFormModel> {
    return this.formBuilder.group({
      label: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(200)]],
      preview: [''],
      content: ['', [Validators.required, Validators.minLength(200)]],
    });
  }

  invalidateForm() {
    this.formGroup.markAsDirty();
    this.formGroup.markAllAsTouched();
    this.formGroup.updateValueAndValidity();
  }

  submitForm() {
    const modelValue = this.formGroup.value;
    const model: Partial<PostDto> = {
      label: modelValue.label!,
      content: modelValue.content!,
      preview: modelValue.preview || undefined,
      description: modelValue.description!,
      blogId: this.blogId || undefined,
    };

    this.isLoading$.next(true);
    this.mainApiService
      .createPost(model)
      .pipe(
        switchMap(post => {
          console.log(post);
          this.alertService
            .open('', {
              label: 'Новый пост создан!',
              autoClose: 5500,
              status: TuiNotification.Success,
            })
            .subscribe();

          return this.navigateOnPost(post.id);
        }),
        // catchError(error => {
        //   this.alertService
        //     .open(error.message || 'Неизвестная ошибка', {
        //       label: 'Ошибка создания!',
        //       autoClose: true,
        //       status: TuiNotification.Error,
        //     })
        //     .subscribe();
        //   return throwError(() => error);
        // }),
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
