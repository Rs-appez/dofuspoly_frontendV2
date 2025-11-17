import { Component, computed, effect, inject } from '@angular/core';
import { GameService } from '@features/board/data/services/game/game.service';

@Component({
  selector: 'app-dice',
  templateUrl: './dice.html',
  styleUrl: './dice.css',
})
export class Dice {
  private _gameService = inject(GameService);
  diceValues$ = this._gameService.diceRoll$;
  isRolling$ = computed(() => {
    const { dice1, dice2 } = this.diceValues$();
    return dice1 === 0 && dice2 === 0;
  });
}
