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
  private _gameService = inject(GameService);

  player$ = this._playerService.player$;
  game$ = this._gameService.game$;

  properties$ = computed(() => {
    const player = this.player$();
    const game = this.game$();

    return (
      game?.board.spaces.filter(
        (space) =>
          player?.owned_spaces.some((os) => os.space == space.name) &&
          space.type === 'Street',
      ) || []
    );
  });

  railroads$ = computed(() => {
    const player = this.player$();
    const game = this.game$();

    return (
      game?.board.spaces.filter(
        (space) =>
          player?.owned_spaces.some((os) => os.space == space.name) &&
          space.type === 'Railroad',
      ) || []
    );
  });

  utilities$ = computed(() => {
    const player = this.player$();
    const game = this.game$();

    return (
      game?.board.spaces.filter(
        (space) =>
          player?.owned_spaces.some((os) => os.space == space.name) &&
          space.type === 'Utility',
      ) || []
    );
  });
}
