import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  private readonly notRight = 403;
  private readonly notAuth = 401;
  private readonly errorStatuses = [500, 400, 404, this.notAuth, this.notRight];

  constructor(private readonly alertService: TuiAlertService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error instanceof HttpErrorResponse) {
          this.handleResponseStatus(error);
        }

        return throwError(() => error);
      })
    );
  }

  private handleResponseStatus({ status }: HttpErrorResponse) {
    if (this.errorStatuses.includes(status)) {
      if (status === this.notAuth) {
        this.alertService
          .open('Неавторизованный доступ!', {
            label: 'Ошибка',
            status: TuiNotification.Error,
            autoClose: true,
          })
          .subscribe();
        return;
      }
      if (status === this.notRight) {
        this.alertService
          .open('Недостаточно прав!', {
            label: 'Ошибка',
            status: TuiNotification.Error,
            autoClose: true,
          })
          .subscribe();
        return;
      }

      this.alertService
        .open('Неизвестная ошибка', {
          label: 'Ошибка',
          status: TuiNotification.Error,
          autoClose: true,
        })
        .subscribe();
    }
  }
}
