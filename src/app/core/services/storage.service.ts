import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  public setJwt(access: string, refresh: string) {
    localStorage.setItem('access', access);
    localStorage.setItem('refresh', refresh);
  }
  public setUsername(username: string) {
    localStorage.setItem('username', username);
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

  public getUsername(): string {
    const username = localStorage.getItem('username') || '';
    if (!username) {
      this.delJwt();
    }
    return username;
  }

  public getRefresh(): string {
    return localStorage.getItem('refresh') || '';
  }
}
