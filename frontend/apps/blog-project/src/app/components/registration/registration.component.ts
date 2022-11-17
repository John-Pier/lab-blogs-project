import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TuiDay } from '@taiga-ui/cdk';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';
import { catchError, finalize, switchMap, throwError } from 'rxjs';
import { BPRoute } from '../../models';
import { AuthTokenApiService } from '../../services';

@Component({
  selector: 'bp-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent implements OnInit {
  readonly formGroup = this.buildRegisterForm();

  readonly loginLink = [BPRoute.Root, BPRoute.Auth];

  readonly minDate: TuiDay = new TuiDay(1900, 1, 1);
  readonly maxDate: TuiDay = TuiDay.currentUtc();

  isLoading = false;

  constructor(
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly tokenApiService: AuthTokenApiService,
    private readonly alertService: TuiAlertService
  ) {}

  ngOnInit(): void {
    console.log('ngOnInit');
  }

  private buildRegisterForm(): FormGroup {
    return this.formBuilder.group({
      login: [null, [Validators.required, Validators.minLength(4)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      firstName: [null, [Validators.minLength(3)]],
      secondName: [null, [Validators.minLength(3)]],
      city: [null, [Validators.minLength(3)]],
      birthDate: [null, []],
    });
  }

  public registerClick() {
    const model = this.formGroup.value;
    this.tokenApiService
      .register$(model)
      .pipe(
        switchMap(() => {
          this.alertService
            .open('Перенаправление на страницу входа', {
              label: 'Вы успешно зарегистрированы!',
              status: TuiNotification.Success,
              autoClose: true,
            })
            .subscribe();

          return this.router.navigate(this.loginLink);
        }),
        catchError(error => {
          this.alertService
            .open('Проверьте корректность вводимых данных', {
              label: 'Ошибка регистрации!',
              status: TuiNotification.Error,
              autoClose: true,
            })
            .subscribe();

          return throwError(() => error);
        }),
        finalize(() => {
          this.isLoading = true;
        })
      )
      .subscribe();
  }
}
