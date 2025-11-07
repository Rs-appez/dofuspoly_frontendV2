import { HttpClient } from '@angular/common/http';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@env/environment';
import { Game } from '@features/board/board.models';
import { Subscription } from 'rxjs/internal/Subscription';
import { timer, throwError, retry, catchError } from 'rxjs';

export interface GameWebSocketMessage {
  game: Game;
}

@Injectable({
  providedIn: 'root',
})
export class GameService {
  BASE_URL: string = `${environment.backUrl}/dofuspoly/game`;
  BASE_WS_URL = environment.webSocketUrl;

  private ws$?: WebSocketSubject<any>;
  private _http: HttpClient = inject(HttpClient);

  private reconnectAttempts = 0;
  private readonly maxReconnectAttempts = 5;

  private _game$ = signal<Game | null>(null);
  readonly game$ = this._game$.asReadonly();

  getPlayerCurrentGame(): Subscription {
    return this._http.get<Game>(`${this.BASE_URL}/current_game/`).subscribe({
      next: (game) => {
        this._game$.set(game);
        this.connect();
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

  // WebSocket connection methods
  connect() {
    if (this._game$() === null) {
      throw new Error('No current game available for WebSocket connection.');
    }
    this.ws$ = webSocket(`${this.BASE_WS_URL}/game/${this._game$()?.id}/`);

    this.ws$.subscribe({
      next: (msg: GameWebSocketMessage) => this._game$.set(msg.game),
      error: (err) => {
        console.error(err);
        this.tryReconnect();
      },
      complete: () => console.log('Connection closed'),
    });
  }
  disconnect() {
    this.ws$?.complete();
  }

  tryReconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('Max reconnect attempts reached');
      this.reconnectAttempts = 0;
      return;
    }

    this.reconnectAttempts++;
    const backoffDelay = Math.pow(2, this.reconnectAttempts) * 1000;
    console.log(
      `Reconnecting... Attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts} after ${backoffDelay}ms`,
    );

    timer(backoffDelay).subscribe(() => {
      this.connect();
    });
  }
}
