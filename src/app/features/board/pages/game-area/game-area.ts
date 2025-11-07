import { Component, inject, OnInit } from '@angular/core';
import { Dice } from '@features/board/components/dice/dice';
import { GameService } from '@features/board/data/services/game/game.service';
import { PlayerInfo } from '@features/board/components/player-info/player-info';
import { EndTurnBtn } from '@features/board/components/end-turn-btn/end-turn-btn';
import { Board } from '@features/board/components/board/board';
import { PlayerService } from '@features/board/data/services/player/player-service';

@Component({
  selector: 'app-game-area',
  imports: [Dice, PlayerInfo, EndTurnBtn, Board],
  templateUrl: './game-area.html',
  styleUrl: './game-area.css',
})
export class GameArea implements OnInit {
  private _playerService = inject(PlayerService);
  private _gameService = inject(GameService);

  ngOnInit(): void {
    this._gameService.launchGame();
  }

  rollDice(): void {
    this._playerService.rollDice();
  }
}
