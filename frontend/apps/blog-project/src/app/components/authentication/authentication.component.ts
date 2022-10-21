import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BPRoute } from '../../models';

@Component({
  selector: 'bp-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthenticationComponent implements OnInit {
  readonly formGroup = this.buildAuthForm();

  readonly registerLink = [BPRoute.Root, BPRoute.Register];

  isLoading = false;

  constructor(private readonly formBuilder: FormBuilder) {}

  ngOnInit(): void {
    console.log('ngOnInit');
  }

  private buildAuthForm(): FormGroup {
    return this.formBuilder.group({
      login: [null, [Validators.required, Validators.minLength(4)]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  onLogin() {
    const model = this.formGroup.value;
    console.log(model);

    this.isLoading = true;
  }

  public invalidateForm() {
    console.log('invalidateForm');
    this.formGroup.updateValueAndValidity();
  }
}
