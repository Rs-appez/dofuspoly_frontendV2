import { HttpClient } from '@angular/common/http';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '@env/environment';
import { Game } from '@features/board/board.models';
import { Subscription } from 'rxjs/internal/Subscription';
import { timer } from 'rxjs';

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
  private wsSubscription?: Subscription;
  private _http: HttpClient = inject(HttpClient);

  private reconnectAttempts = 0;
  private readonly maxReconnectAttempts = 5;

  private _game$ = signal<Game | null>(null);
  readonly game$ = this._game$.asReadonly();

  diceRoll$ = computed(
    () => {
      if (this._game$() === null) {
        return { dice1: 0, dice2: 0 };
      }
      return {
        dice1: this._game$()!.dice1Value,
        dice2: this._game$()!.dice2Value,
      };
    },
    { equal: (a, b) => a.dice1 === b.dice1 && a.dice2 === b.dice2 },
  );

  launchGame(): Subscription {
    return this._http.get<Game>(`${this.BASE_URL}/current_game/`).subscribe({
      next: (game) => {
        this._game$.set(game);
        this.connect();
        console.log('Current game fetched:', game);
      },
      error: (error) => {
        console.error('Error fetching current game:', error);
      },
    });
  }

  // WebSocket connection methods
  connect() {
    if (this._game$() === null) {
      throw new Error('No current game available for WebSocket connection.');
    }
    this.ws$ = webSocket(`${this.BASE_WS_URL}/game/${this._game$()?.id}/`);

    this.wsSubscription = this.ws$.subscribe({
      next: (msg: GameWebSocketMessage) => {
        this.updateGameFromMessage(msg);
        console.log(this._game$());
      },
      error: (err) => {
        console.error(err);
        this.tryReconnect();
      },
      complete: () => console.log('Connection closed'),
    });
  }

  private updateGameFromMessage(msg: GameWebSocketMessage) {
    this._game$.update((current) => {
      if (!current) return msg.game;

      // Only create new board reference if cases changed
      const casesChanged =
        current.board.spaces.length !== msg.game.board.spaces.length ||
        current.board.spaces.some(
          (c, i) => c.name !== msg.game.board.spaces[i]?.name,
        );

      return {
        ...current,
        ...msg.game,
        board: casesChanged
          ? { ...current.board, spaces: [...msg.game.board.spaces] }
          : current.board,
      };
    });
  }

  disconnect() {
    this.wsSubscription?.unsubscribe();
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
