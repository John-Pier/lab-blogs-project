import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TuiDestroyService } from '@taiga-ui/cdk';

@Component({
  selector: 'bp-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.less'],
  providers: [TuiDestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostCreateComponent implements OnInit {
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
