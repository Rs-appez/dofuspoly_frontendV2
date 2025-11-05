import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  BASE_URL: string = `${environment.backUrl}`;
  private _http: HttpClient = inject(HttpClient);
  login(username: string, password: string) {
    return this._http.post(`${this.BASE_URL}/api/token/`, {
      username,
      password,
    });
  }
}
