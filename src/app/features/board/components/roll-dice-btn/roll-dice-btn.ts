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

  rollDice(): void {
    this._playerService.rollDice();
  }
}
