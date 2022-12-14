import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TuiDestroyService } from '@taiga-ui/cdk';

@Component({
  selector: 'bp-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.less'],
  providers: [TuiDestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogCreateComponent implements OnInit {
  readonly formGroup = this.buildForm();
  isLoading = false;

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit() {}

  private buildForm(): FormGroup {
    return this.fb.group({});
  }

  invalidateForm() {
    console.log('invalidateForm');
  }

  submitForm() {}
}
