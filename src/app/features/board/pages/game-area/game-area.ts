import { Component, effect, inject, OnInit } from '@angular/core';
import { Player } from '@features/board/board.models';
import { Dice } from '@features/board/components/dice/dice';
import { GameService } from '@features/board/data/services/game/game.service';

@Component({
  selector: 'app-game-area',
  imports: [Dice],
  templateUrl: './game-area.html',
  styleUrl: './game-area.css',
})
export class GameArea implements OnInit {
  private _gameService = inject(GameService);

  game$ = this._gameService.game$;

  constructor() {
    effect(() => {
      const game = this.game$();
      if (game) {
        console.log('Current game state:', game);
      }
    });
  }

  ngOnInit(): void {
    this._gameService.getPlayerCurrentGame();
  }

  rollDice(): void {
    this._gameService.rollDice();
  }
}
