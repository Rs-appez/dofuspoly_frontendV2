import { Component, inject } from '@angular/core';
import { GameService } from '@features/board/data/services/game/game.service';

@Component({
  selector: 'app-dice',
  templateUrl: './dice.html',
  styleUrl: './dice.css',
})
export class Dice {
  private _gameService = inject(GameService);
  game$ = this._gameService.game$;
}
