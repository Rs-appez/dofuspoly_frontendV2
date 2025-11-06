import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { Player } from '@features/board/board.models';
import { GameService } from '@features/board/data/services/game/game.service';

@Component({
  selector: 'app-player-info',
  imports: [CommonModule],
  templateUrl: './player-info.html',
  styleUrl: './player-info.css',
})
export class PlayerInfo {
  private _gameService = inject(GameService);

  game$ = this._gameService.game$;
  currentPlayer: Player | null = null;

  constructor() {
    effect(() => {
      const game = this.game$();
      if (game) {
        this.currentPlayer = game.current_player;
        console.log('Game update:', game);
      }
    });
  }
}
