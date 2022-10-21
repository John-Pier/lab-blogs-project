import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BPRoute } from '../../models';

@Component({
  selector: 'bp-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent implements OnInit {
  readonly formGroup = this.buildRegisterForm();

  readonly loginLink = [BPRoute.Root, BPRoute.Auth];

  constructor(private readonly formBuilder: FormBuilder) {}

  ngOnInit(): void {
    console.log('ngOnInit');
  }

  private buildRegisterForm(): FormGroup {
    return this.formBuilder.group({
      login: [null, [Validators.required, Validators.minLength(4)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }
}
