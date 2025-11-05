import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  public setJwt(jwt: string) {
    localStorage.setItem('jwt', jwt);
  }

  public delJwt() {
    localStorage.removeItem('jwt');
  }

  public getJwt(): string {
    return localStorage.getItem('jwt') || '';
  }
}
