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
  BASE_URL = computed(
    () => `${environment.backUrl}/dofuspoly/game/${this._game$()?.id}`,
  );

  private _http = inject(HttpClient);
  private _gameService = inject(GameService);
  private _storageService = inject(StorageService);
  private _game$ = this._gameService.game$;

  player$ = computed(() => {
    const game = this._game$();
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
    return game.current_player === player.username;
  });

  isSpaceOwned$ = computed(() => {
    const player = this.player$();
    const game = this._gameService.game$();
    if (player === null || game === null) {
      return false;
    }
    const currentSpace = this._gameService.getSpaceByPosition(player.position);
    if (!currentSpace) {
      return false;
    }
    if (
      game?.players.some((p) =>
        p.owned_spaces.some((os) => os.space === currentSpace.name),
      )
    ) {
      return true;
    }
    return false;
  });

  canBuy$ = computed(() => {
    const player = this.player$();
    if (player === null) {
      return false;
    }
    const currentSpace = this._gameService.getSpaceByPosition(player.position);
    if (!currentSpace || !currentSpace.can_be_bought || this.isSpaceOwned$()) {
      return false;
    }
    return player.money >= currentSpace.price;
  });

  rollDice(): Subscription {
    if (this._game$() === null) {
      throw new Error('No current game available to roll dice.');
    }
    return this._http
      .get<{
        status: string;
      }>(`${this.BASE_URL()}/roll_dice/`)
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
    if (this._game$() === null) {
      throw new Error('No current game available to end turn.');
    }
    return this._http
      .get<{
        status: string;
      }>(`${this.BASE_URL()}/end_turn/`)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (error) => {
          console.error('Error ending turn:', error);
        },
      });
  }

  buyProperty(): Subscription {
    if (this._game$() === null) {
      throw new Error('No current game available to buy property.');
    }
    return this._http
      .get<{
        status: string;
      }>(`${this.BASE_URL()}/buy_space/`)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (error) => {
          console.error('Error buying property:', error);
        },
      });
  }
}
