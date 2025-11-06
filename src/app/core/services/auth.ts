import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

export interface LoginResponse {
  access: string;
  refresh: string;
}

@Injectable({
  providedIn: 'root',
})
export class Auth {
  BASE_URL: string = `${environment.backUrl}`;
  private _http: HttpClient = inject(HttpClient);
  login(username: string, password: string) {
    return this._http.post<LoginResponse>(`${this.BASE_URL}/api/token/`, {
      username,
      password,
    });
  }
}
