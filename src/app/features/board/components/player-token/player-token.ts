import { Component, input } from '@angular/core';
import { Player } from '@features/board/board.models';

@Component({
  selector: 'app-player-token',
  imports: [],
  templateUrl: './player-token.html',
  styleUrl: './player-token.css',
})
export class PlayerToken {
  player$ = input<Player>();
}
