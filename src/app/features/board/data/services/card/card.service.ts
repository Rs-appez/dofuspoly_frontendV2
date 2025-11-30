import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private _isShowingCard$ = signal<boolean>(false);
  readonly isShowingCard$ = this._isShowingCard$.asReadonly();

  showCard(): void {
    this._isShowingCard$.set(true);
  }

  hideCard(): void {
    this._isShowingCard$.set(false);
  }
}
