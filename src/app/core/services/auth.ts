import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private _http: HttpClient = inject(HttpClient);
  login(username: string, password: string) {
    return this._http.post('/api/token/', { username, password });
  }
}
