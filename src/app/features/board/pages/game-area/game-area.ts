import { Component, effect, inject, OnInit } from '@angular/core';
import { Player } from '@features/board/board.models';
import { Dice } from '@features/board/components/dice/dice';
import { GameService } from '@features/board/data/services/game/game.service';
import { PlayerInfo } from '@features/board/components/player-info/player-info';
import { EndTurnBtn } from '@features/board/components/end-turn-btn/end-turn-btn';

@Component({
  selector: 'app-game-area',
  imports: [Dice, PlayerInfo, EndTurnBtn],
  templateUrl: './game-area.html',
  styleUrl: './game-area.css',
})
export class GameArea implements OnInit {
  private _gameService = inject(GameService);

  ngOnInit(): void {
    this._gameService.getPlayerCurrentGame();
  }

  rollDice(): void {
    this._gameService.rollDice();
  }
}
