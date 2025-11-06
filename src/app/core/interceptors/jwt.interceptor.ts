import { inject } from '@angular/core';
import {
  HttpRequest,
  HttpEvent,
  HttpHandlerFn,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { StorageService } from '@core/services/storage.service';
import { Auth } from '@core/services/auth';

export function jwtInterceptor(
  request: HttpRequest<any>,
  next: HttpHandlerFn,
): Observable<HttpEvent<any>> {
  const storageService = inject(StorageService);
  const auth = inject(Auth);
  const token = storageService.getJwt();
  if (token) {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return next(request).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401 && !request.url.endsWith('/refresh')) {
        const refreshToken = storageService.getRefresh();
        if (refreshToken) {
          return auth.refreshToken(refreshToken).pipe(
            switchMap((response) => {
              storageService.setAccessToken(response.access);
              const clonedRequest = request.clone({
                setHeaders: {
                  Authorization: `Bearer ${response.access}`,
                },
              });
              return next(clonedRequest);
            }),
            catchError((refreshErr) => {
              auth.logout();
              return throwError(() => refreshErr);
            }),
          );
        } else {
          auth.logout();
        }
      }
      return throwError(() => err);
    }),
  );
}
