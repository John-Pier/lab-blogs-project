import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';
import { catchError, finalize, switchMap, throwError } from 'rxjs';
import { BPRoute, UserAuthDto } from '../../models';
import { AuthTokenApiService } from '../../services';

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
    private readonly router: Router,
    private readonly tokenApiService: AuthTokenApiService,
    private readonly alertService: TuiAlertService
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
        switchMap(() => {
          this.alertService
            .open('', {
              label: 'Вы успешно вошли!',
              status: TuiNotification.Success,
              autoClose: true,
            })
            .subscribe();

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

          this.formGroup.setErrors({
            login: true,
            password: true,
          });

          return throwError(() => error);
        }),
        finalize(() => {
          this.isLoading = true;
        })
      )
      .subscribe();
  }

  public invalidateForm() {
    this.formGroup.updateValueAndValidity();
  }
}
