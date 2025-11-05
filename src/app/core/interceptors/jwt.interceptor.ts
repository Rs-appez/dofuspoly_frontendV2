import { inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '@core/services/storage.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private _storageService = inject(StorageService);
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const token = this._storageService.getJwt();
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return next.handle(request);
  }
}
