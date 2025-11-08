import { CommonModule } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { Player, Space } from '@features/board/board.models';
import { GameService } from '@features/board/data/services/game/game.service';
import { PlayerToken } from '../player-token/player-token';

@Component({
  selector: 'app-space',
  imports: [CommonModule, PlayerToken],
  templateUrl: './space.html',
  styleUrl: './space.css',
})
export class SpaceComponent {
  private _gameService = inject(GameService);

  space$ = input<Space | null>(null);
  players$ = this._gameService.players$;

  playersOnSpace$ = computed(() => {
    if (!this.space$() || !this.players$()) {
      return [];
    }
    return this.players$()!.filter(
      (player: Player) => player.position === this.space$()!.position,
    );
  });

  color = computed(() => {
    if (!this.space$() || !this.space$()!.color) {
      return null;
    }
    return this.space$()!.color.toLowerCase().replace(' ', '-');
  });

  isRotatedSideways(): boolean {
    const position = this.space$()?.position || 0;
    return (
      (position >= 11 && position <= 19) || (position >= 31 && position <= 39)
    );
  }
}
