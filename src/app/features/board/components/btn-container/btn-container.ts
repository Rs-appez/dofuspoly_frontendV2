import { Component, inject } from '@angular/core';
import { CardService } from '@features/board/data/services/card/card.service';
import { PlayerService } from '@features/board/data/services/player/player-service';

@Component({
  selector: 'app-btn-container',
  imports: [],
  templateUrl: './btn-container.html',
  styleUrl: './btn-container.css',
})
export class BtnContainer {
  private _playerService = inject(PlayerService);
  private _cardService = inject(CardService);
  player$ = this._playerService.player$;
  isCurrentPlayer$ = this._playerService.isPlayerTurn$;
  canBuy$ = this._playerService.canBuy$;

  has_buy = false;

  endTurn(): void {
    this._playerService.endTurn();
    this.has_buy = false;
  }

  rollDice(): void {
    this._playerService.rollDice();
  }

  buyProperty(): void {
    this._playerService.buyProperty();
    this.has_buy = true;
  }

  openCardModal() {
    this._cardService.showCard();
  }
}
