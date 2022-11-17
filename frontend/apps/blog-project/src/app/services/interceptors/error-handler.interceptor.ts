import {
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  private readonly errorStatuses = [500, 400, 404, 403];
  private readonly notRight = 403;
  private readonly notAuth = 401;

  constructor(private readonly alertService: TuiAlertService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap(event => {
        if (event.type === HttpEventType.Response) {
          this.handleResponseStatus(event);
        }
      })
    );
  }

  private handleResponseStatus({ status }: HttpResponse<unknown>) {
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
