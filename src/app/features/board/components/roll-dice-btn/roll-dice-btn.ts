import { Component, inject } from '@angular/core';
import { PlayerService } from '@features/board/data/services/player/player-service';

@Component({
  selector: 'app-roll-dice-btn',
  imports: [],
  templateUrl: './roll-dice-btn.html',
  styleUrl: './roll-dice-btn.css',
})
export class RollDiceBtn {
  private _playerService = inject(PlayerService);
  player$ = this._playerService.player$;
  isCurrentPlayer$ = this._playerService.isPlayerTurn$;

  rollDice(): void {
    this._playerService.rollDice();
  }
}
