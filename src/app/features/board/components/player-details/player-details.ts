import { Component, computed, inject } from '@angular/core';
import { GameService } from '@features/board/data/services/game/game.service';
import { PlayerService } from '@features/board/data/services/player/player-service';
import { ColorPipe } from '@shared/pipes/colorPipe';

@Component({
  selector: 'app-player-details',
  imports: [ColorPipe],
  templateUrl: './player-details.html',
  styleUrl: './player-details.css',
})
export class PlayerDetails {
  private _playerService = inject(PlayerService);

  player$ = this._playerService.player$;

  properties$ = this._playerService.properties$;
  railroads$ = this._playerService.railroads$;
  utilities$ = this._playerService.utilities$;
}
