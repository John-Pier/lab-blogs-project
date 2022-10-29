import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { finalize, first } from 'rxjs';
import { BPRoute, UserAuthDto } from '../../models';
import { TokenApiService } from '../../services';

type AuthForm = Record<keyof UserAuthDto, FormControl>;

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

  constructor(
    private readonly formBuilder: FormBuilder,
    // private readonly destroy$: TuiDestroyService,
    private readonly tokenApiService: TokenApiService
  ) {}

  ngOnInit(): void {
    console.log('ngOnInit');
  }

  private buildAuthForm(): FormGroup<AuthForm> {
    return this.formBuilder.group({
      login: [null, [Validators.required, Validators.minLength(4)]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    } as Record<keyof UserAuthDto, unknown>);
  }

  onLogin() {
    const model = this.formGroup.value as UserAuthDto;

    this.tokenApiService
      .authenticate$(model)
      .pipe(
        finalize(() => {
          this.isLoading = true;
        })
      )
      .subscribe();
  }

  public invalidateForm() {
    console.log('invalidateForm');
    this.formGroup.updateValueAndValidity();
  }
}
