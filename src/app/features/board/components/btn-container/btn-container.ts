import { Component, inject } from '@angular/core';
import { PlayerService } from '@features/board/data/services/player/player-service';

@Component({
  selector: 'app-btn-container',
  imports: [],
  templateUrl: './btn-container.html',
  styleUrl: './btn-container.css',
})
export class BtnContainer {
  private _playerService = inject(PlayerService);
  player$ = this._playerService.player$;
  isCurrentPlayer$ = this._playerService.isPlayerTurn$;

  endTurn(): void {
    this._playerService.endTurn();
  }
  rollDice(): void {
    this._playerService.rollDice();
  }
  buyProperty(): void {
    this._playerService.buyProperty();
  }
}
