import { Component, inject } from '@angular/core';
import { GameService } from '@features/board/data/services/game/game.service';

@Component({
  selector: 'app-player-info',
  imports: [],
  templateUrl: './player-info.html',
  styleUrl: './player-info.css',
})
export class PlayerInfo {
  private _gameService = inject(GameService);

  game$ = this._gameService.game$;
}
