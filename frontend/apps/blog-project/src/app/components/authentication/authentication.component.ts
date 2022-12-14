import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';
import { catchError, finalize, switchMap } from 'rxjs';
import { BPRoute, UserAuthDto } from '../../models';
import { AuthTokenApiService, UserProfileService } from '../../services';

type AuthForm = Record<keyof UserAuthDto, FormControl>;

@Component({
  selector: 'bp-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        authError: () => 'Ошибка входа! Проверьте корректность введенных данных',
      },
    },
  ],
})
export class AuthenticationComponent implements OnInit {
  readonly formGroup = this.buildAuthForm();

  readonly registerLink = [BPRoute.Root, BPRoute.Register];

  isLoading = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly tokenApiService: AuthTokenApiService,
    private readonly alertService: TuiAlertService,
    private readonly userProfileService: UserProfileService
  ) {}

  ngOnInit(): void {}

  private buildAuthForm(): FormGroup<AuthForm> {
    return this.formBuilder.group({
      login: [null, [Validators.required, Validators.minLength(4)]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    } as Record<keyof UserAuthDto, unknown>);
  }

  onLogin() {
    const model = this.formGroup.value as UserAuthDto;

    this.formGroup.markAsDirty();
    this.formGroup.updateValueAndValidity();

    this.tokenApiService
      .authenticate$(model)
      .pipe(
        switchMap(user => {
          this.alertService
            .open('', {
              label: 'Вы успешно вошли!',
              status: TuiNotification.Success,
              autoClose: 1200,
            })
            .subscribe();
          this.userProfileService.setUserProfile(user);

          return this.router.navigate([BPRoute.Root, BPRoute.Content]);
        }),
        catchError(error => {
          this.alertService
            .open('Проверьте корректность вводимых данных', {
              label: 'Ошибка входа!',
              status: TuiNotification.Error,
              autoClose: true,
            })
            .subscribe();

          this.formGroup.setErrors(
            {
              authError: true,
            },
            {
              emitEvent: true,
            }
          );

          this.formGroup.controls.password.setErrors(
            {
              authError: true,
            },
            {
              emitEvent: true,
            }
          );

          return [null];
        }),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe();
  }

  public invalidateForm() {
    this.formGroup.updateValueAndValidity();
  }
}
