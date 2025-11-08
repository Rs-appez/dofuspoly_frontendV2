import { Component, computed, effect, inject } from '@angular/core';
import { GameService } from '@features/board/data/services/game/game.service';
import { SpaceComponent } from '../space/space';
import { CommonModule } from '@angular/common';
import { Dice } from '../dice/dice';
import { EndTurnBtn } from '../end-turn-btn/end-turn-btn';
import { RollDiceBtn } from '../roll-dice-btn/roll-dice-btn';

@Component({
  selector: 'app-board',
  imports: [SpaceComponent, CommonModule, Dice, EndTurnBtn, RollDiceBtn],
  templateUrl: './board.html',
  styleUrl: './board.css',
})
export class Board {
  private _gameService = inject(GameService);
  game$ = this._gameService.game$;

  spaces$ = computed(() => this.game$()?.board.spaces ?? []);
  player$ = computed(() => this.game$()?.current_player ?? null);

  getRow(position: number): number {
    if (position >= 0 && position <= 10) {
      return 11;
    }
    if (position >= 11 && position <= 19) {
      return 21 - position;
    }
    if (position >= 20 && position <= 30) {
      return 1;
    }
    if (position >= 31 && position <= 39) {
      return position - 29;
    }
    return 0;
  }

  getCol(position: number): number {
    if (position >= 0 && position <= 10) {
      return 11 - position;
    }
    if (position >= 11 && position <= 20) {
      return 1;
    }
    if (position >= 21 && position <= 30) {
      return position - 19;
    }
    if (position >= 31 && position <= 39) {
      return 11;
    }
    return 0;
  }

  getRotation(position: number): number {
    if (position >= 20 && position <= 39) {
      return 180;
    }
    return 0;
  }
}
