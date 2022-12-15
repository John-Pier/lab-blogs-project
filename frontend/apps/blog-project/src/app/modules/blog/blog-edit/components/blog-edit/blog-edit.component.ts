import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { TuiAlertService } from '@taiga-ui/core';
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
      categories: [[] as string[], [Validators.required, Validators.minLength(1)]],
    });
  }

  invalidateForm() {
    this.formGroup.markAsDirty();
    this.formGroup.markAllAsTouched();
    this.formGroup.updateValueAndValidity();
  }
}
