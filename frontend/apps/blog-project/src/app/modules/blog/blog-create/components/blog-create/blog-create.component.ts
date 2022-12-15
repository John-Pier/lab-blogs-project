import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';
import { BehaviorSubject, finalize, switchMap } from 'rxjs';
import { BlogCreateDto, BPRoute, CategoryDto } from '../../../../../models';
import { MainApiService } from '../../../../../services';
import { BlogFormModel } from '../../../blog-form';

@Component({
  selector: 'bp-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.less'],
  providers: [TuiDestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogCreateComponent implements OnInit {
  readonly formGroup = this.buildForm();
  readonly categories$ = this.mainApiService.loadCategories();
  public isLoading$ = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly alertService: TuiAlertService,
    private readonly mainApiService: MainApiService
  ) {}

  ngOnInit() {}

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

  submitForm() {
    const modelValue = this.formGroup.value;
    const model: BlogCreateDto = {
      name: modelValue.name!,
      description: modelValue.description!,
      categories: modelValue.categories?.map(({ id }) => id)!,
    };

    this.isLoading$.next(true);
    this.mainApiService
      .createBlog(model)
      .pipe(
        switchMap(blog => {
          this.alertService
            .open('', {
              label: 'Новый блог создан!',
              autoClose: 5500,
              status: TuiNotification.Success,
            })
            .subscribe();

          return this.navigateOnBlog(blog.id);
        }),
        finalize(() => {
          this.isLoading$.next(false);
        })
      )
      .subscribe();
  }

  public cancelClick() {
    this.router.navigate(['../'], {
      relativeTo: this.route,
    });
  }

  private navigateOnBlog(id: string): Promise<boolean> {
    return this.router.navigate([BPRoute.Root, BPRoute.Content, BPRoute.Blogs, id]);
  }
}
