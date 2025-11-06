import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  public setJwt(access: string, refresh: string) {
    localStorage.setItem('access', access);
    localStorage.setItem('refresh', refresh);
  }

  public setAccessToken(access: string) {
    localStorage.setItem('access', access);
  }

  public delJwt() {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
  }

  public getJwt(): string {
    return localStorage.getItem('access') || '';
  }

  public getRefresh(): string {
    return localStorage.getItem('refresh') || '';
  }
}
