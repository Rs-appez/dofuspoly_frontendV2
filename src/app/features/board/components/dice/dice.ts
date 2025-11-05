import { Component, inject } from '@angular/core';
import { DiceService } from '@features/board/data/services/dice/dice.service';

@Component({
  selector: 'app-dice',
  imports: [],
  templateUrl: './dice.html',
  styleUrl: './dice.css',
})
export class Dice {
  private _diceService: DiceService = inject(DiceService);
  diceRollsCount$ = this._diceService.diceRollsCount$;
}
