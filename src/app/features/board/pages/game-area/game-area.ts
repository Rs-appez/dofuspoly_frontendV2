import {
  Component,
  effect,
  ElementRef,
  inject,
  OnInit,
  viewChild,
} from '@angular/core';
import { GameService } from '@features/board/data/services/game/game.service';
import { PlayerInfo } from '@features/board/components/player-info/player-info';
import { Board } from '@features/board/components/board/board';
import { PlayerDetails } from '@features/board/components/player-details/player-details';
import { ShowCard } from '@features/board/components/show-card/show-card';
import { CardService } from '@features/board/data/services/card/card.service';

@Component({
  selector: 'app-game-area',
  imports: [PlayerInfo, Board, PlayerDetails, ShowCard],
  templateUrl: './game-area.html',
  styleUrl: './game-area.css',
})
export class GameArea implements OnInit {
  private _gameService = inject(GameService);
  private _cardService = inject(CardService);

  cardModal = viewChild<ElementRef<HTMLDialogElement>>('cardModal');
  isShowingCard$ = this._cardService.isShowingCard$;

  constructor() {
    effect(() => {
      const isShowing = this.isShowingCard$();
      const modal = this.cardModal()?.nativeElement;

      if (modal) {
        if (isShowing) {
          modal.showModal();
        } else {
          modal.close();
        }
      }
    });
  }

  ngOnInit(): void {
    this._gameService.launchGame();
  }

  onModalClose() {
    this._cardService.hideCard();
  }
}
