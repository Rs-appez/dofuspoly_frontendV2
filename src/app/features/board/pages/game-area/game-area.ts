import { Component, inject, OnInit } from '@angular/core';
import { Dice } from '@features/board/components/dice/dice';
import { DiceService } from '@features/board/data/services/dice/dice.service';

@Component({
  selector: 'app-game-area',
  imports: [Dice],
  templateUrl: './game-area.html',
  styleUrl: './game-area.css',
})
export class GameArea {
  private _diceService: DiceService = inject(DiceService);

  rollDice(): void {
    this._diceService.rollDice();
  }
}
