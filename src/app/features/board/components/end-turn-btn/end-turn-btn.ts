import { Component, inject } from '@angular/core';
import { PlayerService } from '@features/board/data/services/player/player-service';

@Component({
  selector: 'app-end-turn-btn',
  imports: [],
  templateUrl: './end-turn-btn.html',
  styleUrl: './end-turn-btn.css',
})
export class EndTurnBtn {
  private _playerService = inject(PlayerService);
  player$ = this._playerService.player$;
  isCurrentPlayer$ = this._playerService.isPlayerTurn$;

  endTurn(): void {
    this._playerService.endTurn();
  }
}
