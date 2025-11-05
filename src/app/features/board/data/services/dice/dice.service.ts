import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DiceService {
  private _diceRollCount$: WritableSignal<number> = signal(0);
  public readonly diceRollsCount$ = this._diceRollCount$.asReadonly();

  rollDice() {
    const diceRoll = Math.floor(Math.random() * 6) + 1;
    this._diceRollCount$.set(diceRoll);
  }
}
