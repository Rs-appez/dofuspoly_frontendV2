import { Component, computed, effect, inject } from '@angular/core';
import { GameService } from '@features/board/data/services/game/game.service';
import { SpaceComponent } from '../space/space';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-board',
  imports: [SpaceComponent, CommonModule],
  templateUrl: './board.html',
  styleUrl: './board.css',
})
export class Board {
  private _gameService = inject(GameService);
  game$ = this._gameService.game$;

  spaces$ = computed(() => this.game$()?.board.spaces ?? []);

  getRow(position: number): number {
    if (position >= 0 && position <= 11) {
      return 11;
    }
    if (position >= 12 && position <= 20) {
      return 22 - position;
    }
    if (position >= 21 && position <= 31) {
      return 1;
    }
    if (position >= 32 && position <= 40) {
      return position - 30;
    }
    return 0;
  }

  getCol(position: number): number {
    if (position >= 1 && position <= 11) {
      return 12 - position;
    }
    if (position >= 12 && position <= 21) {
      return 1;
    }
    if (position >= 22 && position <= 31) {
      return position - 20;
    }
    if (position >= 32 && position <= 40) {
      return 11;
    }
    return 0;
  }

  getRotation(position: number): number {
    if (position >= 21 && position <= 40) {
      return 180;
    }
    return 0;
  }
  isRotatedSideways(position: number): boolean {
    return (
      (position >= 12 && position <= 20) || (position >= 32 && position <= 40)
    );
  }
}
