import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';
import { BehaviorSubject, EMPTY, finalize, first, switchMap, tap } from 'rxjs';
import { BlogCreateDto, BlogDto, BPRoute, BPRouteParam, CategoryDto } from '../../../../../models';
import { MainApiService } from '../../../../../services';
import { BlogFormModel } from '../../../blog-form';

@Component({
  selector: 'bp-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.less'],
  providers: [TuiDestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogEditComponent implements OnInit {
  readonly formGroup = this.buildForm();
  readonly categories$ = this.mainApiService.loadCategories();
  public isLoading$ = new BehaviorSubject<boolean>(true);

  blog: BlogDto | undefined;

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
          const blogId = paramMap.get(BPRouteParam.BlogId);
          if (!blogId) {
            this.navigateToNotFound();
            return EMPTY;
          }
          return this.mainApiService.loadBlog(blogId);
        }),
        first(),
        tap(blog => {
          if (!blog) {
            this.navigateToNotFound();
          }
          this.blog = blog;
          this.pathForm(blog);
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

  private pathForm(blog: BlogDto) {
    this.formGroup.patchValue({
      description: blog.description,
      name: blog.name,
      categories: blog.categories,
    });
    this.formGroup.markAsPristine();
  }

  private buildForm(): FormGroup<BlogFormModel> {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(20)]],
      categories: [[] as CategoryDto[], [Validators.required, Validators.minLength(1)]],
    });
  }

  invalidateForm() {
    this.formGroup.markAsDirty();
    this.formGroup.markAllAsTouched();
    this.formGroup.updateValueAndValidity();
  }

  public cancelClick() {
    this.router.navigate(['../'], {
      relativeTo: this.route,
    });
  }

  public submitForm() {
    const modelValue = this.formGroup.value;
    const model: BlogCreateDto = {
      name: modelValue.name!,
      description: modelValue.description!,
      categories: modelValue.categories?.map(({ id }) => id)!,
    };

    this.isLoading$.next(true);
    this.mainApiService
      .updateBlog(model, this.blog?.id!)
      .pipe(
        switchMap(post => {
          this.alertService
            .open('', {
              label: 'Изменения сохранены!',
              autoClose: 5500,
              status: TuiNotification.Success,
            })
            .subscribe();

          return this.navigateOnBlog(post.id);
        }),
        finalize(() => {
          this.isLoading$.next(false);
        })
      )
      .subscribe();
  }

  private navigateOnBlog(id: string): Promise<unknown> {
    return this.router.navigate([BPRoute.Root, BPRoute.Content, BPRoute.Blogs, id]);
  }
}
