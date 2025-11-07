import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Subscription } from 'rxjs';
import { GameService } from '../game/game.service';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  BASE_URL: string = `${environment.backUrl}/dofuspoly/game`;

  private _http: HttpClient = inject(HttpClient);
  private _gameService: GameService = inject(GameService);

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
