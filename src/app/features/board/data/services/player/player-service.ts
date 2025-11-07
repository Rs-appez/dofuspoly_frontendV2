import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Subscription } from 'rxjs';
import { GameService } from '../game/game.service';
import { StorageService } from '@core/services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  BASE_URL: string = `${environment.backUrl}/dofuspoly/game`;

  private _http = inject(HttpClient);
  private _gameService = inject(GameService);
  private _storageService = inject(StorageService);
  private _game$ = this._gameService.game$;

  player$ = computed(() => {
    const game = this._gameService.game$();
    if (game === null) {
      return null;
    }
    const currentPlayer = this._storageService.getUsername();
    return (
      game.players.find((player) => player.username === currentPlayer) || null
    );
  });
  isPlayerTurn$ = computed(() => {
    const player = this.player$();
    const game = this._gameService.game$();
    if (game === null || player === null) {
      return false;
    }
    return game.current_player.username === player.username;
  });

  game$ = this._gameService.game$;
  rollDice(): Subscription {
    if (this.game$() === null) {
      throw new Error('No current game available to roll dice.');
    }
    return this._http
      .get<{
        status: string;
      }>(`${this.BASE_URL}/${this.game$()!.id}/roll_dice/`)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (error) => {
          console.error('Error rolling dice:', error);
        },
      });
  }

  endTurn(): Subscription {
    if (this.game$() === null) {
      throw new Error('No current game available to end turn.');
    }
    return this._http
      .get<{
        status: string;
      }>(`${this.BASE_URL}/end_turn/`)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (error) => {
          console.error('Error ending turn:', error);
        },
      });
  }
}
