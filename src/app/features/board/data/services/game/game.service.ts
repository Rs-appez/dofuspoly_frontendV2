import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@env/environment';
import { Game, Player } from '@features/board/board.models';
import { Subscription } from 'rxjs/internal/Subscription';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  BASE_URL: string = `${environment.backUrl}/dofuspoly/game`;
  private _http: HttpClient = inject(HttpClient);

  private _game$ = signal<Game | null>(null);
  readonly game$ = this._game$.asReadonly();

  getPlayerCurrentGame(playerId: string): Subscription {
    const params = { user: playerId };
    return this._http
      .get<Game>(`${this.BASE_URL}/current_game/`, { params })
      .subscribe({
        next: (game) => {
          this._game$.set(game);
        },
        error: (error) => {
          console.error('Error fetching current game:', error);
        },
      });
  }
  rollDice(): Subscription {
    if (this.game$() === null) {
      throw new Error('No current game available to roll dice.');
    }
    return this._http
      .get<{
        status: string;
        game: Game;
      }>(`${this.BASE_URL}/${this.game$()!.id}/roll_dice/`)
      .subscribe({
        next: (res) => {
          console.log(
            `${res.game.current_player} rolled a ${res.game.dice1Value} and a ${res.game.dice2Value}`,
          );
          this._game$.set(res.game);
        },
        error: (error) => {
          console.error('Error rolling dice:', error);
        },
      });
  }
}
