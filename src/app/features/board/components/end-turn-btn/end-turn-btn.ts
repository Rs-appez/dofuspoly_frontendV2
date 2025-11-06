import { Component, inject } from '@angular/core';
import { GameService } from '@features/board/data/services/game/game.service';

@Component({
  selector: 'app-end-turn-btn',
  imports: [],
  templateUrl: './end-turn-btn.html',
  styleUrl: './end-turn-btn.css',
})
export class EndTurnBtn {
  private _gameService = inject(GameService);

  endTurn(): void {
    this._gameService.endTurn();
  }
}
