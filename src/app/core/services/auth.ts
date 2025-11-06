import { inject, Injectable } from '@angular/core';
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
  login(username: string, password: string) {
    return this._http.post<LoginResponse>(`${this.BASE_URL}/api/token/`, {
      username,
      password,
    });
  }

  logout() {
    this._storageService.delJwt();
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
