import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { StorageService } from './storage.service';

export interface LoginResponse {
  access: string;
  refresh: string;
}

@Injectable({
  providedIn: 'root',
})
export class Auth {
  BASE_URL: string = `${environment.backUrl}`;

  private _storageService = inject(StorageService);
  private _http: HttpClient = inject(HttpClient);

  private readonly _isLoggedIn = signal<boolean>(
    this._storageService.getJwt().length > 0,
  );

  readonly isLoggedIn = this._isLoggedIn.asReadonly();

  login(username: string, password: string) {
    this._isLoggedIn.set(true);
    return this._http.post<LoginResponse>(`${this.BASE_URL}/api/token/`, {
      username,
      password,
    });
  }

  logout() {
    this._storageService.delJwt();
    this._isLoggedIn.set(false);
  }

  refreshToken(refresh: string) {
    return this._http.post<LoginResponse>(
      `${this.BASE_URL}/api/token/refresh/`,
      {
        refresh,
      },
    );
  }
}
