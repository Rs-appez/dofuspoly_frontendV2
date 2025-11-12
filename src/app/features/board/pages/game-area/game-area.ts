import { Component, inject, OnInit } from '@angular/core';
import { GameService } from '@features/board/data/services/game/game.service';
import { PlayerInfo } from '@features/board/components/player-info/player-info';
import { Board } from '@features/board/components/board/board';
import { PlayerDetails } from '@features/board/components/player-details/player-details';

@Component({
  selector: 'app-game-area',
  imports: [PlayerInfo, Board, PlayerDetails],
  templateUrl: './game-area.html',
  styleUrl: './game-area.css',
})
export class GameArea implements OnInit {
  private _gameService = inject(GameService);

  ngOnInit(): void {
    this._gameService.launchGame();
  }
}
